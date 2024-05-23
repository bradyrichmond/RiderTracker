import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { OrgDataContext } from '@/contexts/OrgDataContext'
import { RoleContext } from '@/contexts/RoleContext'
import { Box, Button, Drawer, Fab, Paper, Stack, Tooltip } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import CreateStopForRouteDialog from './CreateStopForRouteDialog'
import { StopType } from '@/types/StopType'
import { v4 as uuid } from 'uuid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { OptionsType } from '@/types/FormTypes'
import RouteDrawerDetailList from './RouteDrawerDetailList'
import { useNavigate } from 'react-router-dom'

interface RouteDrawerProps {
    open: boolean
    routeId: string
}

const RouteDrawer = ({ open, routeId }: RouteDrawerProps) => {
    const [isAddingStop, setIsAddingStop] = useState(false)
    const [stops, setStops] = useState<OptionsType[]>([])
    const [riders, setRiders] = useState<OptionsType[]>([])
    const { api } = useContext(ApiContext)
    const { orgId } = useContext(OrgDataContext)
    const { heaviestRole } = useContext(RoleContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (routeId) {
            getRouteData()
        }
    }, [routeId, orgId])

    const getRouteData = async () => {
        const fetchedRoute = await api.routes.getRouteById(orgId, routeId)

        if (fetchedRoute.stopIds) {
            getStopsForRoute(fetchedRoute.stopIds)
        }

        if (fetchedRoute.riderIds) {
            getRidersForRoute(fetchedRoute.riderIds)
        }
    }

    const getStopsForRoute = async (stopIds: string[]) => {
        const fetchedStops = await api.stops.getBulkStopsByIds(orgId, stopIds)
        const mappedStops: OptionsType[] = fetchedStops.map((s) => ({ id: s.id, label: s.stopName }))
        setStops(mappedStops)
    }

    const getRidersForRoute = async (riderIds: string[]) => {
        const fechedRiders = await api.riders.getBulkRidersByIds(orgId, riderIds)
        const mappedRiders: OptionsType[] = fechedRiders.map((s) => ({ id: s.id, label: `${s.firstName} ${s.lastName}` }))
        setRiders(mappedRiders)
    }

    const toggleAddingStop = () => {
        setIsAddingStop((current) => !current)
    }

    const deleteRouteAction = async () => {
        await api.routes.deleteRoute(orgId, routeId)
    }

    const createStopAction = async (newStop: StopType) => {
        newStop.routeId = routeId
        const newAddressId = await createAddress(newStop.address)
        newStop.address = newAddressId

        await api.stops.createStop(orgId, newStop)
        toggleAddingStop()
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

    const viewStopDetail = (stopId: string) => {
        navigate(`/app/stops/${stopId}`)
    }

    const viewRiderDetail = (riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }

    const toggleDrawer = () => {
        navigate('/app/routes')
    }

    return (
        <Drawer open={open} onClose={toggleDrawer} anchor='right' variant="temporary">
            <CreateStopForRouteDialog createStop={createStopAction} cancelAction={toggleAddingStop} isAddingStop={isAddingStop} />
            <Box sx={{ ml: '1rem', mt: '1rem', mb: '1rem' }}>
                <Fab onClick={toggleDrawer}><ArrowForwardIcon /></Fab>
            </Box>
            <Box sx={{ margin: '1rem', width: '20vw', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ flex: 1 }}>
                    <Stack direction='column' justifyContent='' alignItems='center' spacing={2} sx={{ height: '100%' }}>
                        <Paper sx={{ width: '100%', flex: 1 }}>
                            <Box sx={{ height: '100%', width: '100%' }}>
                                <RouteDrawerDetailList items={stops} action={viewStopDetail} />
                            </Box>
                        </Paper>
                        <Paper sx={{ width: '100%', flex: 1 }}>
                            <Box sx={{ height: '100%', width: '100%' }}>
                                <RouteDrawerDetailList items={riders} action={viewRiderDetail} />
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
                <Box sx={{ pt: '1rem' }}>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={8}>
                        {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_STOP) ?
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => toggleAddingStop()}
                                sx={{ padding: '2rem' }}
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
                                onClick={() => deleteRouteAction()}
                                sx={{ padding: '2rem' }}
                            >
                                <Tooltip title='Delete Route?'>
                                    <DeleteForeverIcon />
                                </Tooltip>
                            </Button>
                            :
                            null
                        }
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    )
}

export default RouteDrawer