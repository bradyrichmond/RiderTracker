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
    }
}))