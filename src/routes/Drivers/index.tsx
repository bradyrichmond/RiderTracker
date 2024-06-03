import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { UserType } from '@/types/UserType'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useDriverStore } from '@/store/DriverStore'
import DriverDrawer from './DriverDrawer'
import CreateDriverDialog from './CreateDriverDialog'
import { CreateCognitoUserParams } from '@/API/AdminApis'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import { useAdminStore } from '@/store/AdminStore'

interface DriversProps {
    activeDriver?: string
}

const Drivers = ({ activeDriver }: DriversProps) => {
    const [isAddingDriver, setIsAddingDriver] = useState(false)
    const { drivers, updateDrivers } = useDriverStore()
    const createDriver = useAdminStore().createDriver
    const heaviestRole = useUserStore().heaviestRole
    const navigate = useNavigate()
    const { t } = useTranslation('drivers')

    useEffect(() => {
        updateDrivers()
    }, [updateDrivers])

    const createDriverAction = async (newDriver: CreateCognitoUserParams) => {
        await createDriver(newDriver)
        toggleAddingDriver()
    }

    const toggleAddingDriver = () => {
        setIsAddingDriver((current) => !current)
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
                {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_DRIVER) ?
                    <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                        <Button variant='contained' onClick={toggleAddingDriver}>
                            <Box display='flex' flexDirection='row'>
                                <AddCircleIcon />
                                <Box flex='1' marginLeft='1rem'>
                                    <Typography>{t('addDriver')}</Typography>
                                </Box>
                            </Box>
                        </Button>
                    </Box>
                    :
                    null
                }
            </Box>
            <DriverDrawer open={!!activeDriver} driverId={activeDriver ?? ''} />
            <CreateDriverDialog
                isAddingDriver={isAddingDriver}
                cancel={toggleAddingDriver}
                createDriver={createDriverAction}
            />
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