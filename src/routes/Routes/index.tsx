import { useContext, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { RouteType } from '@/types/RouteType'
import { useApiStore } from '@/store/ApiStore'
import { useTranslation } from 'react-i18next'
import CreateRouteDialog from './CreateRouteDialog'
import RouteDrawer from './RouteDrawer'
import { useNavigate } from 'react-router-dom'
import { useOrgStore } from '@/store/OrgStore'

interface RoutesProps {
    activeRoute?: string
}

const Routes = ({ activeRoute }: RoutesProps) => {
    const [routes, setRoutes] = useState<RouteType[]>([])
    const [isAddingRoute, setIsAddingRoute] = useState(false)
    const { api } = useApiStore()
    const { orgId } = useOrgStore()
    const { t } = useTranslation('routes')
    const navigate = useNavigate()

    useEffect(() => {
        if (orgId) {
            updateRoutes()
        }
    }, [orgId, activeRoute])

    const updateRoutes = async () => {
        const fetchedRoutes = await api.routes.getRoutes(orgId)
        setRoutes(fetchedRoutes)
    }

    const createRoute = async (newRoute: RouteType) => {
        await api.routes.createRoute(orgId, newRoute)
        setIsAddingRoute(false)
        updateRoutes()
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'routeNumber',  headerName: 'Route Number', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'stopIds', headerName: 'Stops', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[] | null) => value ? value.length : 0 },
            { field: 'riderIds', headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[] | null) => value ? value.length : 0 }
        ]

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: RouteType) => {
        return updatedRow
    }

    const startAddingRoute = () => {
        setIsAddingRoute(true)
    }

    const cancelAction = () => {
        setIsAddingRoute(false)
    }

    const handleRowClick = (rowId: string) => {
        navigate(`/app/routes/${rowId}`)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('routes')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={startAddingRoute}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addRoute')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <RouteDrawer open={!!activeRoute} routeId={activeRoute ?? ''} />
            <CreateRouteDialog createRoute={createRoute} cancelAction={cancelAction} isAddingRoute={isAddingRoute} />
            <Box flex='1'>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {routes ?
                        <DataGrid
                            rows={routes}
                            columns={generateGridColumns()}
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

export default Routes