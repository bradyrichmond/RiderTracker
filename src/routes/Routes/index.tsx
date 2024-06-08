import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridComparatorFn } from '@mui/x-data-grid'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { RouteType } from '@/types/RouteType'
import { useTranslation } from 'react-i18next'
import CreateRouteDialog from './CreateRouteDialog'
import RouteDrawer from './RouteDrawer'
import { useNavigate } from 'react-router-dom'
import { useRouteStore } from '@/store/RouteStore'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import Grid from '@mui/material/Unstable_Grid2'

interface RoutesProps {
    activeRoute?: string
}

const routeNumberComparator: GridComparatorFn<string> = (v1, v2) =>
    parseInt(v1) - parseInt(v2)

const Routes = ({ activeRoute }: RoutesProps) => {
    const [isAddingRoute, setIsAddingRoute] = useState(false)
    const { routes, getRoutes, createRoute } = useRouteStore()
    const heaviestRole = useUserStore().heaviestRole
    const { t } = useTranslation('routes')
    const navigate = useNavigate()

    useEffect(() => {
        getRoutes()
    }, [activeRoute, getRoutes])

    const createRouteAction = async (newRoute: RouteType) => {
        await createRoute(newRoute)
        setIsAddingRoute(false)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'routeNumber',  headerName: 'Route Number', flex: 1, align: 'center', headerAlign: 'center', sortComparator: routeNumberComparator },
            { field: 'stopIds', headerName: 'Stops', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[] | null) => value ? value.length : 0 },
            { field: 'riderIds', headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[] | null) => value ? value.length : 0 }
        ]

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: RouteType) => {
        return updatedRow
    }

    const toggleIsAddingRoute = () => {
        setIsAddingRoute((current) => !current)
    }

    const handleRowClick = (rowId: string) => {
        navigate(`/app/routes/${rowId}`)
    }

    return (
        <Grid container spacing={2}>
            <RouteDrawer open={!!activeRoute} routeId={activeRoute ?? ''} />
            <CreateRouteDialog createRoute={createRouteAction} cancelAction={toggleIsAddingRoute} isAddingRoute={isAddingRoute} />
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '1rem' }}>
                    <Typography variant='h2'>
                        {t('routes')}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs={12} md={6}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_ROUTE) ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant='contained' onClick={toggleIsAddingRoute}>
                                <Box display='flex' flexDirection='row'>
                                    <AddCircleIcon />
                                    <Box flex='1' marginLeft='1rem'>
                                        <Typography>{t('addRoute')}</Typography>
                                    </Box>
                                </Box>
                            </Button>
                        </Box>
                        :
                        null
                    }
                </Box>
            </Grid>
            <Grid xs>
                <Box sx={{ height: '100%', width: '100%' }}>
                    {routes ?
                        <DataGrid
                            rows={routes}
                            columns={generateGridColumns()}
                            rowHeight={100}
                            processRowUpdate={processRowUpdate}
                            onRowClick={(params) => handleRowClick(params.row.id)}
                            initialState={{
                                sorting: {
                                  sortModel: [{ field: 'routeNumber', sort: 'asc' }],
                                },
                            }}
                        />
                        :
                        <CircularProgress  />
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Routes