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

interface RidersProps {
    activeRider?: string
}

const Riders = ({ activeRider }: RidersProps) => {
    const { createRider, getRiders, riders, changeSearchArg } = useRiderStore()
    const { schools, getSchools } = useSchoolStore()
    const { stops, getStops } = useStopStore()
    const { guardians, getGuardians } = useGuardianStore()
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
        return schools.map((s) => ({
            label: s.schoolName,
            id: s.id
        }))
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
                        <CircularProgress />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Riders