import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import CreateStopForRouteDialog from './CreateStopForRouteDialog'
import { StopType } from '@/types/StopType'
import { OptionsType } from '@/types/FormTypes'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
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
    const { orgId } = useOrgStore()
    const { getRouteById, deleteRoute } = useRouteStore()
    const { heaviestRole } = useUserStore()
    const { getBulkRidersById } = useRiderStore()
    const { createAddress } = useAddressStore()
    const { createStop, getBulkStopsById } = useStopStore()
    const navigate = useNavigate()
    const { t } = useTranslation('routes')

    useEffect(() => {
        if (routeId) {
            getRouteData()
        }
    }, [routeId, orgId])

    useEffect(() => {
        buildLists()
    }, [localRiders, actionItems])

    const getRouteData = async () => {
        const fetchedRoute = await getRouteById(routeId)

        if (fetchedRoute) {
            setRouteNumber(fetchedRoute.routeNumber)

            if (fetchedRoute.stopIds) {
                getStopsForRoute(fetchedRoute.stopIds)
            }

            if (fetchedRoute.riderIds) {
                getRidersForRoute(fetchedRoute.riderIds)
            }

            buildActionItems()
        }
    }

    const buildActionItems = () => {
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
    }

    const buildLists = () => {
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
    }

    const getStopsForRoute = async (stopIds: string[]) => {
        const fetchedStops = await getBulkStopsById(stopIds)

        if (fetchedStops) {
            const mappedStops: OptionsType[] = fetchedStops.map((s) => ({ id: s.id, label: s.stopName }))
            setStops(mappedStops)
        }
    }

    const getRidersForRoute = async (riderIds: string[]) => {
        const riders = await getBulkRidersById(riderIds)
        setLocalRiders(riders.map((r) => ({ id: r.id, label: `${r.firstName} ${r.lastName}` })))
    }

    const toggleAddingStop = () => {
        setIsAddingStop((current) => !current)
    }

    const deleteRouteAction = async () => {
        await deleteRoute(routeId)
    }

    const createStopAction = async (newStop: StopType) => {
        const newAddressId = await createAddress(newStop.address)
        newStop.routeId = routeId
        newStop.address = newAddressId

        await createStop(newStop)
        toggleAddingStop()
    }

    const viewStopDetail = (stopId: string) => {
        navigate(`/app/stops/${stopId}`)
    }

    const viewRiderDetail = (riderId: string) => {
        navigate(`/app/riders/${riderId}`)
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