import { useRouteActionStore } from '@/store/RouteActionStore'
import { useRouteStore } from '@/store/RouteStore'
import { useUserStore } from '@/store/UserStore'
import { ActionType } from '@/types/RouteActionType'
import { RouteType } from '@/types/RouteType'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ActiveRoute = () => {
    const [activeRoute, setActiveRoute] = useState<RouteType | undefined>()
    const getRouteActionsByDriverId = useRouteActionStore().getRouteActionsByDriverId
    const getRouteById = useRouteStore().getRouteById
    const userId = useUserStore().userId
    const navigate = useNavigate()

    useEffect(() => {
        const getActiveRoute = async () => {
            const filteredByDriver = await getRouteActionsByDriverId(userId)
            const mostRecent = filteredByDriver[0]

            if (mostRecent && mostRecent.actionType === ActionType.ROUTE_BEGIN) {
                const activeRoute = await getRouteById(mostRecent.routeId)
                setActiveRoute(activeRoute)
                return
            }

            navigate('/app')
        }

        getActiveRoute()
    }, [getRouteActionsByDriverId, userId, getRouteById, navigate])

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                Active Route Id: {activeRoute?.id}
            </Grid>
        </Grid>
    )
}

export default ActiveRoute