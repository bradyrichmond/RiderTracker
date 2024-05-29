import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { UserType } from '@/types/UserType'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useDriverStore } from '@/store/DriverStore'
import DriverDrawer from './DriverDrawer'

interface DriversProps {
    activeDriver?: string
}

const Drivers = ({ activeDriver }: DriversProps) => {
    const { drivers, updateDrivers } = useDriverStore()
    const navigate = useNavigate()
    const { t } = useTranslation('drivers')

    useEffect(() => {
        updateDrivers()
    }, [updateDrivers])

    const createDriverAction = async () => {
        return
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' }
        ]

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: UserType) => {
        return updatedRow
    }

    const handleRowClick = (driverId: string) => {
        navigate(`/app/drivers/${driverId}`)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('drivers')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={createDriverAction}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addDrivers')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <DriverDrawer open={!!activeDriver} driverId={activeDriver ?? ''} />
            <Box flex='1'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {drivers ?
                        <DataGrid
                            rows={drivers}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                        />
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Drivers