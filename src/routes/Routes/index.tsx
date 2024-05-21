import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import InfoIcon from '@mui/icons-material/Info'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { RouteType } from '@/types/RouteType'
import { ApiContext } from '@/contexts/ApiContextProvider'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import { useTranslation } from 'react-i18next'
import { OrgDataContext } from '@/contexts/OrgDataContext'
import { RoleContext } from '@/contexts/RoleContext'
import CreateRouteDialog from './CreateRouteDialog'
import { StopType } from '@/types/StopType'
import CreateStopForRouteDialog from './CreateStopForRouteDialog'
import { v4 as uuid } from 'uuid'

const Routes = () => {
    const [routes, setRoutes] = useState<RouteType[]>([])
    const [isAddingRoute, setIsAddingRoute] = useState(false)
    const [isAddingStop, setIsAddingStop] = useState(false)
    const [activeRow, setActiveRow] = useState('')
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

    const createStopAction = async (newStop: StopType) => {
        newStop.routeId = activeRow
        const newAddressId = await createAddress(newStop.address)
        newStop.address = newAddressId

        await createStop(newStop)
        await addStopToRoute(newStop.id)
    }

    const addStopToRoute = async (newStopId: string) => {
        const routeToUpdate = routes.find((r) => r.id === activeRow)

        if (routeToUpdate) {
            let currentStops = routeToUpdate?.stopIds

            if (currentStops) {
                currentStops?.push(newStopId)
            } else {
                currentStops = [newStopId]
            }

            routeToUpdate.stopIds = currentStops

            await api.routes.updateRoute(orgId, activeRow, routeToUpdate)
            setIsAddingStop(false)
            setActiveRow('')
            updateRoutes()
        } else {
            throw 'Unable to add stop to route'
        }
    }

    const createStop = async (newStop: StopType) => {
        await api.stops.createStop(orgId, newStop)
    }

    const createAddress = async (address: string) => {
        const validatedAddress = await api.addresses.validateAddress(address)

        if (validatedAddress) {
            const newAddressId = uuid()
            await api.addresses.createAddress(orgId, validatedAddress)
            return newAddressId
        } else {
            throw 'Unable to validate address'
        }
    }

    const deleteRouteAction = async (id: string) => {
        await api.routes.deleteRoute(orgId, id)
        updateRoutes()
    }

    const startAddingStop = (row: string) => {
        setIsAddingStop(true)
        setActiveRow(row)
    }

    const viewRouteDetails = (id: string) => {
        navigate(`/routes/${id}`)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'routeNumber',  headerName: 'Route Number', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'stopIds', headerName: 'Stops', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[] | null) => value ? value.length : 0 },
            { field: 'riderIds', headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[] | null) => value ? value.length : 0 },
            { field: 'viewDetails', headerName: 'Actions', flex: 1, align: 'center', headerAlign: 'center',
                renderCell: (params) => {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => viewRouteDetails(params.row.id)}
                            >
                                <Tooltip title='View details'>
                                    <InfoIcon />
                                </Tooltip>
                            </Button>
                            {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_STOP) ?
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => startAddingStop(params.row.id)}
                                >
                                    <Tooltip title='Create Stop'>
                                        <AddLocationIcon />
                                    </Tooltip>
                                </Button>
                                :
                                null
                            }
                            {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_ROUTE) ?
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => deleteRouteAction(params.row.id)}
                                >
                                    <Tooltip title='Delete Route?'>
                                        <DeleteForeverIcon />
                                    </Tooltip>
                                </Button>
                                :
                                null
                            }
                        </Box>
                    )
                }
            }
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
        setIsAddingStop(false)
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
            <CreateStopForRouteDialog createStop={createStopAction} cancelAction={cancelAction} isAddingStop={isAddingStop} />
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