import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import CreateStopForRouteDialog from './CreateStopForRouteDialog'
import { StopType } from '@/types/StopType'
import { OptionsType } from '@/types/FormTypes'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { useRiderStore } from '@/store/RiderStore'
import EntityDrawer, { DrawerListActionProps, DrawerListItem } from '@/components/EntityDrawer'
import { useStopStore } from '@/store/StopStore'
import { useRouteStore } from '@/store/RouteStore'
import { useAddressStore } from '@/store/AddressStore'

interface RouteDrawerProps {
    open: boolean
    routeId: string
}

const RouteDrawer = ({ open, routeId }: RouteDrawerProps) => {
    const [isAddingStop, setIsAddingStop] = useState(false)
    const [routeNumber, setRouteNumber] = useState('')
    const [lists, setLists] = useState<DrawerListItem[]>([])
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const [stops, setStops] = useState<OptionsType[]>([])
    const [localRiders, setLocalRiders] = useState<OptionsType[]>([])
    const { getRouteById, deleteRoute } = useRouteStore()
    const { heaviestRole } = useUserStore()
    const { getBulkRidersById } = useRiderStore()
    const { createAddress } = useAddressStore()
    const { createStop, getBulkStopsById } = useStopStore()
    const navigate = useNavigate()
    const { t } = useTranslation('routes')

    const viewStopDetail = useCallback((stopId: string) => {
        navigate(`/app/stops/${stopId}`)
    }, [navigate])

    const viewRiderDetail = useCallback((riderId: string) => {
        navigate(`/app/riders/${riderId}`)
    }, [navigate])

    const deleteRouteAction = useCallback(async () => {
        await deleteRoute(routeId)
    }, [deleteRoute, routeId])

    const buildActionItems = useCallback(() => {
        const builtActionItems: DrawerListActionProps[] = []
        const userPermissions = RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole]

        if (userPermissions.includes(permissions.CREATE_STOP)) {
            builtActionItems.push({
                handleClick: toggleAddingStop,
                tooltipTitle: t('createStop'),
                Icon: AddLocationIcon
            })
        }

        if (userPermissions.includes(permissions.DELETE_ROUTE)) {
            builtActionItems.push({
                handleClick: deleteRouteAction,
                tooltipTitle: t('deleteRoute'),
                Icon: DeleteForeverIcon
            })
        }

        setActionItems(builtActionItems)
    }, [deleteRouteAction, heaviestRole, t])

    const buildLists = useCallback(() => {
        const builtLists = [
            {
                title: t('stops'),
                action: viewStopDetail,
                items: stops
            },
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: localRiders
            }
        ]

        setLists(builtLists)
    }, [localRiders, stops, t, viewRiderDetail, viewStopDetail])

    useEffect(() => {
        const getRouteData = async () => {
            const fetchedRoute = await getRouteById(routeId)

            if (fetchedRoute) {
                setRouteNumber(fetchedRoute.routeNumber)

                const stopIds = fetchedRoute.stopIds
                if (stopIds) {
                    const fetchedStops = await getBulkStopsById(stopIds)

                    if (fetchedStops) {
                        setStops(fetchedStops.map((s) => ({ id: s.id, label: s.stopName })))
                    }
                }

                const riderIds = fetchedRoute.riderIds
                if (riderIds) {
                    const riders = await getBulkRidersById(riderIds)
                    setLocalRiders(riders.map((r) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` })))
                }

                buildActionItems()
            }
        }

        if (routeId) {
            getRouteData()
        }
    }, [routeId, buildActionItems, getBulkRidersById, getBulkStopsById, getRouteById ])

    useEffect(() => {
        buildLists()
    }, [localRiders, actionItems, buildLists])

    const toggleAddingStop = () => {
        setIsAddingStop((current) => !current)
    }

    const createStopAction = async (newStop: StopType) => {
        const newAddressId = await createAddress(newStop.address)
        newStop.routeId = routeId
        newStop.address = newAddressId.id

        await createStop(newStop)
        toggleAddingStop()
    }

    const handleBack = () => {
        navigate('/app/routes')
    }

    return (
        <>
            <CreateStopForRouteDialog isAddingStop={isAddingStop} createStop={createStopAction} cancelAction={toggleAddingStop} />
            <EntityDrawer
                actionItems={actionItems}
                back={handleBack}
                lists={lists}
                open={open}
                title={`Route ${routeNumber}`}
            />
        </>
    )
}

export default RouteDrawer