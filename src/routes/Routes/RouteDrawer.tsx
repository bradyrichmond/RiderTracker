import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useCallback, useEffect, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import CreateStopForRouteDialog from './CreateStopForRouteDialog'
import { StopType } from '@/types/StopType'
import { OptionsType } from '@/types/FormTypes'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useStopStore } from '@/store/StopStore'
import { useRouteStore } from '@/store/RouteStore'
import { useAddressStore } from '@/store/AddressStore'
import { RiderType } from '@/types/RiderType'
import { RouteType } from '@/types/RouteType'

interface RouteDrawerProps {
    open: boolean
    routeId: string
}

const RouteDrawer = ({ open, routeId }: RouteDrawerProps) => {
    const [isAddingStop, setIsAddingStop] = useState(false)
    const [route, setRoute] = useState<RouteType>()
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const { getRouteById, deleteRoute } = useRouteStore()
    const { heaviestRole } = useUserStore()
    const { createAddress } = useAddressStore()
    const { createStop } = useStopStore()
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

    const stops: OptionsType[] = useMemo(() => {
        if (route?.stopIds && route.stops) {
            return route.stops.map((s: StopType) => ({
                id: s.id,
                label: s.stopName
            }))
        }

        return []
    }, [route])

    const riders: OptionsType[] = useMemo(() => {
        if (route?.riderIds && route.riders) {
            return route.riders.map((r: RiderType) => ({
                id: r.id,
                label: `${r.firstName} ${r.lastName}`
            }))
        }

        return []
    }, [route])

    const lists = useMemo(() => [
            {
                title: t('stops'),
                action: viewStopDetail,
                items: stops
            },
            {
                title: t('riders'),
                action: viewRiderDetail,
                items: riders
            }
        ], [riders, stops, t, viewRiderDetail, viewStopDetail])

    useEffect(() => {
        const getRouteData = async () => {
            const fetchedRoute = await getRouteById(routeId)

            if (fetchedRoute) {
                setRoute(fetchedRoute)
                buildActionItems()
            }
        }

        if (routeId) {
            getRouteData()
        }
    }, [routeId, buildActionItems, getRouteById ])

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
                title={`Route ${route?.routeNumber}`}
            />
        </>
    )
}

export default RouteDrawer