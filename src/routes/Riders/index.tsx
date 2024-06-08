import { useNavigate } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { OptionsType } from '@/types/FormTypes'
import { GuardianType } from '@/types/UserType'
import CreateRiderDialog from './CreateRiderDialog'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useRiderStore } from '@/store/RiderStore'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import RiderDrawer from './RiderDrawer'
import SearchBar from '@/components/SearchBar'
import { useSchoolStore } from '@/store/SchoolStore'
import { useStopStore } from '@/store/StopStore'
import { useGuardianStore } from '@/store/GuardianStore'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import Grid from '@mui/material/Unstable_Grid2'

interface RidersProps {
    activeRider?: string
}

const Riders = ({ activeRider }: RidersProps) => {
    const { createRider, getRiders, riders, changeSearchArg } = useRiderStore()
    const { schools, getSchools } = useSchoolStore()
    const { stops, getStops } = useStopStore()
    const { guardians, getGuardians } = useGuardianStore()
    const heaviestRole = useUserStore().heaviestRole
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const [isAddingRider, setIsAddingRider] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation(['riders', 'common'])

    useEffect(() => {
        const getData = async () => {
            try {
                await getSchools()
                await getStops()
                await getGuardians()
                await getRiders()
            } catch {
                showErrorSnackbar('Failed to get all data')
            }
        }

        getData()
    }, [getGuardians, getRiders, getSchools, getStops, showErrorSnackbar])

    const allSchools: OptionsType[] = useMemo(() => {
        if (schools) {
            return schools.map((s) => ({
                label: s.schoolName,
                id: s.id
            }))
        } else {
            return []
        }
    }, [schools])

    const allStops: OptionsType[] = useMemo(() => {
        return stops.map((s) => ({
            label: s.stopName,
            id: s.id
        }))
    }, [stops])

    const allGuardians: OptionsType[] = useMemo(() => {
        return guardians.map((g: GuardianType) => ({
            label: `${g.firstName} ${g.lastName}`,
            id: g.id
        }))
    }, [guardians])

    const handleCreateRider = async (newRider: RiderType) => {
        try {
            await createRider(newRider)
            setIsAddingRider(false)
        } catch {
            showErrorSnackbar('Failed to create rider.')
        }
    }

    const columns = useMemo((): GridColDef[] => {
        const getSchoolNameById = (schoolId: string) => {
            if (schoolId) {
                return allSchools.find((s) => s.id === schoolId)?.label
            }
        }

        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'schoolId',  headerName: 'School', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value) => getSchoolNameById(value) }
        ]

        return initialGridColumns
    }, [allSchools])

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
        <Grid container spacing={2}>
            <CreateRiderDialog
                createRider={handleCreateRider}
                isAddingRider={isAddingRider}
                allGuardians={allGuardians}
                allSchools={allSchools}
                allStops={allStops}
                cancelAction={cancelAction}
            />
            <RiderDrawer open={!!activeRider} rider={riders.find((r: RiderType) => r.id === activeRider)} />
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '1rem' }}>
                    <Typography variant='h2'>
                        {t('riders')}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_RIDER) ?
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' onClick={startAddingRider}>
                                <Box display='flex' flexDirection='row'>
                                    <AddCircleIcon />
                                    <Box flex='1' marginLeft='1rem'>
                                        <Typography>{t('addRider')}</Typography>
                                    </Box>
                                </Box>
                            </Button>
                        </Box>
                        :
                        null
                    }
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={{ mb: '1rem' }}>
                    <SearchBar onChange={changeSearchArg} fullWidth />
                </Box>
            </Grid>
            <Grid xs>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {riders ?
                        <DataGrid
                            rows={riders}
                            columns={columns}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                            initialState={{
                                sorting: {
                                  sortModel: [{ field: 'lastName', sort: 'asc' }],
                                },
                            }}
                        />
                        :
                        <CircularProgress />
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Riders