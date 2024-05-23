import { useNavigate } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { Box, Button, Tooltip } from '@mui/material'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useEffect, useMemo, useState } from 'react'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { RoleContext } from '@/contexts/RoleContext'
import { OptionsType } from '@/types/FormTypes'
import { GuardianType } from '@/types/UserType'
import { v4 as uuid } from 'uuid'
import { OrgDataContext } from '@/contexts/OrgDataContext'
import CreateRiderDialog from './CreateRiderDialog'

const Riders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const [allSchools, setAllSchools] = useState<OptionsType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [allStops, setAllStops] = useState<OptionsType[]>([])
    const [isAddingRider, setIsAddingRider] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const [newRiderId, setNewRiderId] = useState('')
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole, userId } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)

    useEffect(() => {
        if (orgId) {
            getData()
        }
    }, [orgId])

    const getData = async () => {
        await getAllSchools()
        await getAllStops()
        await getAllGuardians()
        await getRiders()
    }

    const getRiders = async () => {
        // TODO: add pagination handling
        const fetchedRiders = await api.riders.getRiders(orgId)
        setRiders(fetchedRiders)
    }

    const getAllSchools = async () => {
        const fetchedSchools = await api.schools.getSchools(orgId)
        const mappedSchools = fetchedSchools.map((s) => ({
            label: s.schoolName,
            id: s.id
        }))
        setAllSchools(mappedSchools)
    }

    const getAllStops = async () => {
        const fetchedStops = await api.stops.getStops(orgId)
        const mappedStops = fetchedStops.map((s) => ({
            label: s.stopName,
            id: s.id
        }))

        setAllStops(mappedStops)
    }

    const getAllGuardians = async () => {
        const org = await api.organizations.getOrganizationById(orgId)
        const orgGuardianIds = org.guardianIds
        if (orgGuardianIds) {
            const fetchedGuardians: GuardianType[] = await api.users.getBulkGuardiansByIds(orgId, orgGuardianIds)
            const mappedGuardians = fetchedGuardians.map((g: GuardianType) => ({
                label: `${g.firstName} ${g.lastName}`,
                id: g.id
            }))
            setAllGuardians(mappedGuardians)
        }
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const deleteRiderAction = async (riderId: string) => {
        await api.riders.deleteRider(orgId, riderId)
    }

    const createRider = async (newRider: RiderType) => {
        setDisableButtons(true)
        await api.riders.createRider(orgId, newRider)
        setDisableButtons(false)
        setIsAddingRider(false)
    }

    const getSchoolNameById = (schoolId: string) => {
        if (schoolId) {
            return allSchools.find((s) => s.id === schoolId)?.label
        }
    }

    const columns = useMemo((): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'schoolId',  headerName: 'School', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value) => getSchoolNameById(value) },
            { field: 'stopIds',  headerName: 'Stops', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[]) => Array.isArray(value) ? value.length : 0 },
            { field: 'guardianIds',  headerName: 'Guardians', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[]) => Array.isArray(value) ? value.length : 0 },
            { field: 'viewDetails', headerName: 'Actions', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => viewRiderDetails(params.row.id)}
                            >
                                <Tooltip title='View Details'>
                                    <InfoIcon />
                                </Tooltip>
                            </Button>
                        </Box>
                        {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_RIDER) ?
                        <Box sx={{ ml: '1rem' }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => deleteRiderAction(params.row.id)}
                            >
                                <Tooltip title='Delete Rider?'>
                                    <PersonRemoveIcon />
                                </Tooltip>
                            </Button>
                        </Box>
                            :
                            null
                        }
                    </Box>
                )
            } }
        ]

        return initialGridColumns
    }, [riders, userId])

    const processRowUpdate = async (updatedRow: RiderType) => {
        return updatedRow
    }

    const startAddingRider = () => {
        const newUuid = uuid()
        setNewRiderId(newUuid)
        setIsAddingRider(true)
    }

    const cancelAction = () => {
        setIsAddingRider(false)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CreateRiderDialog
                allGuardians={allGuardians}
                allSchools={allSchools}
                allStops={allStops}
                cancelAction={cancelAction}
                createRider={createRider}
                disableButtons={disableButtons}
                isAddingRider={isAddingRider}
                newRiderId={newRiderId}
                orgId={orgId}
                startAddingRider={startAddingRider}
            />
            <Box flex='1'>
                <DataGrid rows={riders} columns={columns} rowHeight={100} processRowUpdate={processRowUpdate} />
            </Box>
        </Box>
    )
}

export default Riders