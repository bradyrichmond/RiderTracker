import { useNavigate } from 'react-router-dom'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { OptionsType } from '@/types/OptionsType'
import CreateRiderDialog from './CreateRiderDialog'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useRiderStore } from '@/store/RiderStore'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import RiderDrawer from './RiderDrawer'
import SearchBar from '@/components/SearchBar'
import { useSchoolStore } from '@/store/SchoolStore'
import Grid from '@mui/material/Unstable_Grid2'
import { RiderType, UpdateRiderTypeInput } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

interface RidersProps {
    activeRider?: string
}

const Riders = ({ activeRider }: RidersProps) => {
    const riders = useRiderStore().riders
    const updateRiders = useRiderStore().updateRiders
    const updateUsers = useUserStore().updateUsers
    const isAdmin = useUserStore().currentUser?.isAdmin
    const changeSearchArg = useRiderStore().changeSearchArg
    const updateSchools = useSchoolStore().updateSchools
    const schools = useSchoolStore().schools
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const [isAddingRider, setIsAddingRider] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation(['riders', 'common'])

    useEffect(() => {
        updateSchools()
        updateUsers()
        updateRiders()
    }, [updateUsers, updateRiders, updateSchools, showErrorSnackbar])

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

    const columns = useMemo((): GridColDef[] => {
        const getSchoolNameById = (schoolId: string) => {
            if (schoolId) {
                return allSchools.find((s) => s.id === schoolId)?.label
            }
        }

        const initialGridColumns: GridColDef[] = [
            { field: 'firstName', headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName', headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'schoolId', headerName: 'School', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value) => getSchoolNameById(value) }
        ]

        return initialGridColumns
    }, [allSchools])

    const processRowUpdate = async (updatedRow: UpdateRiderTypeInput) => {
        return updatedRow
    }

    const startAddingRider = () => {
        setIsAddingRider(true)
    }

    const cancelAction = () => {
        setIsAddingRider(false)
        updateRiders()
    }

    const handleRowClick = (id: string) => {
        navigate(`/app/riders/${id}`)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Grid container spacing={2} sx={{ height: '100%' }}>
                    <CreateRiderDialog isAddingRider={isAddingRider} cancelAction={cancelAction} />
                    <RiderDrawer open={!!activeRider} rider={riders.find((r: RiderType) => r.id === activeRider)} />
                    <Grid xs={12} md={6}>
                        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                            <Typography variant='h2'>
                                {t('riders')}
                            </Typography>
                        </Box>
                    </Grid>
                    {isAdmin ?
                        <Grid xs={12} md={6}>
                            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button variant='contained' onClick={startAddingRider}>
                                        <Box display='flex' flexDirection='row'>
                                            <AddCircleIcon />
                                            <Box sx={{ flex: 1, ml: 2 }}>
                                                <Typography>{t('addRider')}</Typography>
                                            </Box>
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        :
                        null
                    }
                </Grid>
            </Box>
            <Box sx={{ mb: 2 }}>
                <SearchBar onChange={changeSearchArg} fullWidth />
            </Box>
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
        </Box>
    )
}

export default Riders