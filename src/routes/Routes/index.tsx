import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import InfoIcon from '@mui/icons-material/Info'
import WrongLocationIcon from '@mui/icons-material/WrongLocation'
import { RouteType } from '@/types/RouteType'
import { ApiContext } from '@/contexts/ApiContextProvider'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'react-i18next'
import { OrgDataContext } from '@/contexts/OrgDataContext'
import { RoleContext } from '@/contexts/RoleContext'
import CreateRouteDialog from './CreateRouteDialog'

const Routes = () => {
    const [routes, setRoutes] = useState<RouteType[]>([])
    const [isAddingRoute, setIsAddingRoute] = useState(false)
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)
    const { t } = useTranslation('routes')

    useEffect(() => {
        if (orgId) {
            updateRoutes()
        }
    }, [orgId])

    const updateRoutes = async () => {
        const fetchedRoutes = await api.routes.getRoutes(orgId)
        setRoutes(fetchedRoutes)
    }

    const createRoute = async (newRoute: RouteType) => {
        await api.routes.createRoute(orgId, newRoute)
        setIsAddingRoute(false)
    }

    const deleteRouteAction = async (id: string) => {
        await api.routes.deleteRoute(orgId, id)
        updateRoutes()
    }

    const viewRouteDetails = (id: string) => {
        navigate(`/routes/${id}`)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'id',  headerName: 'Route Id', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'stopIds', headerName: 'Stops', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[]) => value.length },
            { field: 'riderIds', headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[]) => value.length },
            { field: 'viewDetails', headerName: 'Actions', flex: 1, align: 'center', headerAlign: 'center',
                renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => viewRouteDetails(params.row.id)}
                        >
                            <Tooltip title='View details'>
                                <InfoIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            }
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_STOP)) {
            initialGridColumns.push({
                field: 'delete',
                headerName: '',
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteRouteAction(params.row.id)}
                        >
                            <Tooltip title='Delete Route?'>
                                <WrongLocationIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

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
            <CreateRouteDialog createRoute={createRoute} cancelAction={cancelAction} isAddingRoute={isAddingRoute} />
            <Box flex='1'>
                {routes ?
                    <DataGrid rows={routes} columns={generateGridColumns()} rowHeight={100} processRowUpdate={processRowUpdate} />
                    :
                    null
                }
            </Box>
        </Box>
    )
}

export default Routes