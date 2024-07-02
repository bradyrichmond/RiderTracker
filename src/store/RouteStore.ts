import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { RouteType } from '@/types/RouteType'
import { useUserStore } from './UserStore'

interface RouteStore {
    routes: RouteType[]
    getRoutes(): Promise<void>
    getActiveRoutes(): Promise<RouteType[]>
    getInactiveRoutes(): Promise<RouteType[]>
    createRoute(route: RouteType): Promise<void>
    deleteRoute(routeId: string): Promise<void>
    getRouteById(routeId: string): Promise<RouteType>
    setRouteActive(routeId: string): Promise<void>
    setRouteInactive(routeId: string): Promise<void>
}

export const useRouteStore = create<RouteStore>((set, get) => ({
    routes: [],
    getRoutes: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedRoutes = await api?.routes.getRoutes(orgId)

        if (fetchedRoutes) {
            set(() => ({ routes: fetchedRoutes }))
        }
    },
    getActiveRoutes: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedRoutes = await api?.routes.getRoutes(orgId, { isActive: true })

        return fetchedRoutes
    },
    getInactiveRoutes: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedRoutes = await api?.routes.getRoutes(orgId, { isActive: false })

        return fetchedRoutes
    },
    getRouteById: async (routeId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedRoute = await api?.routes.getRouteById(orgId, routeId)

        if (fetchedRoute) {
            return fetchedRoute
        }

        throw 'Could not get route by id'
    },
    createRoute: async (route: RouteType) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        await api?.routes.createRoute(orgId, route)
        await get().getRoutes()
    },
    deleteRoute: async (routeId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        await api?.routes.deleteRoute(orgId, routeId)
        await get().getRoutes()
    },
    setRouteActive: async (routeId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const userId = useUserStore.getState().userId

        await api?.routes.updateRoute(orgId, routeId, { isActive: true, updatedBy: userId, updatedAt: new Date().getTime() })
    },
    setRouteInactive: async (routeId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const userId = useUserStore.getState().userId

        await api?.routes.updateRoute(orgId, routeId, { isActive: false, updatedBy: userId, updatedAt: new Date().getTime() })
    }
}))