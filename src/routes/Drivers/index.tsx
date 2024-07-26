import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import DriverDrawer from './DriverDrawer'
import CreateDriverDialog from './CreateDriverDialog'
import { UserType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

interface DriversProps {
    activeDriver?: string
}

const Drivers = ({ activeDriver }: DriversProps) => {
    const users = useUserStore().users
    const updateUsers = useUserStore().updateUsers
    const [isAddingDriver, setIsAddingDriver] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation('drivers')

    useEffect(() => {
        updateUsers()
    }, [updateUsers])

    const drivers = useMemo(() => {
        return users.filter((u) => u.isDriver)
    }, [users])

    const toggleAddingDriver = () => {
        setIsAddingDriver((current) => !current)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName', headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName', headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' }
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
            <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h2'>
                        {t('drivers')}
                    </Typography>
                </Box>
                <Box sx={{ padding: 4, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button variant='contained' onClick={toggleAddingDriver}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box sx={{ flex: 1, ml: 2 }}>
                                <Typography>{t('addDriver')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <DriverDrawer open={!!activeDriver} driverId={activeDriver ?? ''} />
            <CreateDriverDialog
                isAddingDriver={isAddingDriver}
                cancel={toggleAddingDriver}
            />
            <Box sx={{ flex: 1 }}>
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