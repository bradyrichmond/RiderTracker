import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { RouteType } from '@/types/RouteType'
import { StopType } from '@/types/StopType'

interface RouteStore {
    routes: RouteType[]
    getRoutes(): Promise<void>
    createRoute(route: RouteType): Promise<void>
    deleteRoute(routeId: string): Promise<void>
    getRouteById(routeId: string): Promise<RouteType>
    addStopToRoute(route: RouteType, stop: StopType): Promise<void>
    addRiderToRoute(route: RouteType, riderId: string): Promise<void>
}

export const useRouteStore = create<RouteStore>((set, get) => ({
    routes: [],
    getRoutes: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        const fetchedRoutes = await api?.routes.getRoutes(orgId)

        if (fetchedRoutes) {
            set(() => ({ routes: fetchedRoutes }))
        }
    },
    getRouteById: async (routeId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        const fetchedRoute = await api?.routes.getRouteById(orgId, routeId)

        if (fetchedRoute) {
            return fetchedRoute
        }

        throw 'Could not get route by id'
    },
    createRoute: async (route: RouteType) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        await api?.routes.createRoute(orgId, route)
        await get().getRoutes()
    },
    deleteRoute: async (routeId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        await api?.routes.deleteRoute(orgId, routeId)
        await get().getRoutes()
        // TODOS:
        // Delete all stops on route
        // remove stops from riders, maybe done automatically by delete stop?
    },
    addStopToRoute: async (route: RouteType, stop: StopType) => {
        const api = useApiStore.getState().api
        const orgId = route.id
        let stopIds = route.stopIds

        if (!stopIds) {
            stopIds = []
        }

        stopIds.push(stop.id)
        route.stopIds = stopIds

        await api?.routes.updateRoute(orgId, route.id, route)
    },
    addRiderToRoute: async (route: RouteType, riderId: string) => {
        const api = useApiStore.getState().api
        let riderIds = route.riderIds

        if (!riderIds || riderIds.length < 1) {
            riderIds = []
        }

        riderIds.push(riderId)
        route.riderIds = riderIds

        await api?.routes.updateRoute(route.orgId, route.id, route)
    }
}))