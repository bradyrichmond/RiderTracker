import { useNavigate } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useMemo, useState } from 'react'
import { useApiStore } from '@/store/ApiStore'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { OptionsType } from '@/types/FormTypes'
import { GuardianType } from '@/types/UserType'
import { v4 as uuid } from 'uuid'
import CreateRiderDialog from './CreateRiderDialog'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SyncIcon from '@mui/icons-material/Sync'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import { useTranslation } from 'react-i18next'

const Riders = () => {
    const { getRiders, riders } = useRiderStore()
    const [allSchools, setAllSchools] = useState<OptionsType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [allStops, setAllStops] = useState<OptionsType[]>([])
    const [isAddingRider, setIsAddingRider] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const [newRiderId, setNewRiderId] = useState('')
    const navigate = useNavigate()
    const { api } = useApiStore()
    const { heaviestRole, userId } = useUserStore()
    const { orgId } = useOrgStore()
    const { t } = useTranslation('riders')

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

    const getAllSchools = async () => {
        const fetchedSchools = await api?.schools.getSchools(orgId)

        if (fetchedSchools) {
            const mappedSchools = fetchedSchools.map((s) => ({
                label: s.schoolName,
                id: s.id
            }))
            setAllSchools(mappedSchools)
        }
    }

    const getAllStops = async () => {
        const fetchedStops = await api?.stops.getStops(orgId)

        if (fetchedStops) {
            const mappedStops = fetchedStops.map((s) => ({
                label: s.stopName,
                id: s.id
            }))

            setAllStops(mappedStops)
        }
    }

    const getAllGuardians = async () => {
        const org = await api?.organizations.getOrganizationById(orgId)
        const orgGuardianIds = org?.guardianIds

        if (orgGuardianIds) {
            const fetchedGuardians: GuardianType[] | undefined = await api?.users.getBulkGuardiansByIds(orgId, orgGuardianIds)

            if (fetchedGuardians) {
                const mappedGuardians = fetchedGuardians.map((g: GuardianType) => ({
                    label: `${g.firstName} ${g.lastName}`,
                    id: g.id
                }))
                setAllGuardians(mappedGuardians)
            }
        }
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const deleteRiderAction = async (riderId: string) => {
        await api?.riders.deleteRider(orgId, riderId)
    }

    const createRider = async (newRider: RiderType) => {
        setDisableButtons(true)

        await api?.riders.createRider(orgId, newRider)

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
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('riders')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Box sx={{ mr: '2rem', ml: '2rem' }}>
                        <Button variant='contained' onClick={() => getRiders()}><SyncIcon fontSize='large' /></Button>
                    </Box>
                    <Button variant='contained' onClick={startAddingRider}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addRider')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <Box flex='1'>
                <DataGrid rows={riders} columns={columns} rowHeight={100} processRowUpdate={processRowUpdate} />
            </Box>
        </Box>
    )
}

export default Riders