import { useRouteActionStore } from '@/store/RouteActionStore'
import { useRouteStore } from '@/store/RouteStore'
import { useUserStore } from '@/store/UserStore'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Schema } from '../../../../amplify/data/resource'
import { RouteActionTypes } from '@/types/AmplifyTypes'

const ActiveRoute = () => {
    const [activeRoute, setActiveRoute] = useState<Schema['Route']['type'] | undefined>()
    const routeActions = useRouteActionStore().routeActions
    const getRouteById = useRouteStore().getRouteById
    const userId = useUserStore().currentUser?.id
    const navigate = useNavigate()

    useEffect(() => {
        const getActiveRoute = async () => {
            if (userId) {
                const filteredByDriver = routeActions
                const mostRecent = filteredByDriver[0]

                if (mostRecent && mostRecent.actionType === RouteActionTypes.ROUTE_START) {
                    const activeRoute = await getRouteById(mostRecent.routeId)
                    setActiveRoute(activeRoute)
                    return
                }

                navigate('/app')
            }
        }

        getActiveRoute()
    }, [userId, getRouteById, navigate, routeActions])

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                Active Route Id: {activeRoute?.id}
            </Grid>
        </Grid>
    )
}

export default ActiveRoute