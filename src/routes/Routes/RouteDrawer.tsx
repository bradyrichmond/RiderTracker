import { useCallback, useEffect, useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import CreateStopForRouteDialog from './CreateStopForRouteDialog'
import { OptionsType } from '@/types/OptionsType'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EntityDrawer, { DrawerListActionProps } from '@/components/EntityDrawer'
import { useStopStore } from '@/store/StopStore'
import { useRouteStore } from '@/store/RouteStore'
import { Schema } from '../../../amplify/data/resource'

interface RouteDrawerProps {
    open: boolean
    routeId: string
}

type RouteType = Schema['Route']['type']
type StopType = Schema['Stop']['type']

const RouteDrawer = ({ open, routeId }: RouteDrawerProps) => {
    const [isAddingStop, setIsAddingStop] = useState(false)
    const [route, setRoute] = useState<RouteType>()
    const [actionItems, setActionItems] = useState<DrawerListActionProps[]>([])
    const { getRouteById, deleteRoute } = useRouteStore()
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

        builtActionItems.push({
            handleClick: toggleAddingStop,
            tooltipTitle: t('createStop'),
            Icon: AddLocationIcon
        })
        builtActionItems.push({
            handleClick: deleteRouteAction,
            tooltipTitle: t('deleteRoute'),
            Icon: DeleteForeverIcon
        })

        setActionItems(builtActionItems)
    }, [deleteRouteAction, t])

    const stops: OptionsType[] = useMemo(() => {
        return []
    }, [])

    const riders: OptionsType[] = useMemo(() => {
        return []
    }, [])

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
        newStop.routeId = routeId

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