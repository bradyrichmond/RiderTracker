import { useNavigate } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { Box, Button, Typography } from '@mui/material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useApiStore } from '@/store/ApiStore'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { OptionsType } from '@/types/FormTypes'
import { GuardianType } from '@/types/UserType'
import CreateRiderDialog from './CreateRiderDialog'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import RiderDrawer from './RiderDrawer'
import SearchBar from '@/components/SearchBar'

interface RidersProps {
    activeRider?: string
}

const Riders = ({ activeRider }: RidersProps) => {
    const { createRider, getRiders, riders, changeSearchArg } = useRiderStore()
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const [allSchools, setAllSchools] = useState<OptionsType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [allStops, setAllStops] = useState<OptionsType[]>([])
    const [isAddingRider, setIsAddingRider] = useState(false)
    const navigate = useNavigate()
    const { api } = useApiStore()
    const { userId } = useUserStore()
    const { orgId } = useOrgStore()
    const { t } = useTranslation(['riders', 'common'])

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

    const handleCreateRider = async (newRider: RiderType) => {
        try {
            await createRider(newRider)
            setIsAddingRider(false)
        } catch {
            showErrorSnackbar('Failed to create rider.')
        }
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
            { field: 'schoolId',  headerName: 'School', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value) => getSchoolNameById(value) }
        ]

        return initialGridColumns
    }, [riders, userId])

    const processRowUpdate = async (updatedRow: RiderType) => {
        return updatedRow
    }

    const startAddingRider = () => {
        setIsAddingRider(true)
    }

    const cancelAction = () => {
        setIsAddingRider(false)
    }

    const handleRowClick = (id: string) => {
        navigate(`/app/riders/${id}`)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('riders')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
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
            <RiderDrawer open={!!activeRider} riderId={activeRider ?? ''} />
            <CreateRiderDialog
                createRider={handleCreateRider}
                isAddingRider={isAddingRider}
                allGuardians={allGuardians}
                allSchools={allSchools}
                allStops={allStops}
                cancelAction={cancelAction}
            />
            <Box sx={{ mb: '2rem' }}>
                <SearchBar onChange={changeSearchArg} fullWidth />
            </Box>
            <Box flex='1'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {riders ?
                        <DataGrid
                            rows={riders}
                            columns={columns}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                        />
                        :
                        null
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Riders