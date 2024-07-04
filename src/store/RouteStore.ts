import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'

type RouteType = Schema['Route']['type']

interface RouteStore {
    routes: RouteType[]
    getRoutes(): Promise<void>
    getActiveRoutes(): Promise<RouteType[]>
    getInactiveRoutes(): Promise<RouteType[]>
    createRoute(route: Schema['Route']['createType']): Promise<void>
    deleteRoute(routeId: string): Promise<void>
    getRouteById(routeId: string): Promise<RouteType>
    setRouteActive(routeId: string): Promise<void>
    setRouteInactive(routeId: string): Promise<void>
}

export const useRouteStore = create<RouteStore>((set) => ({
    routes: [],
    getRoutes: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedRoutes } = await client.models.Route.list()

        if (fetchedRoutes) {
            set({ routes: fetchedRoutes })
        }
    },
    getActiveRoutes: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedRoutes } = await client.models.Route.list()

        return fetchedRoutes
    },
    getInactiveRoutes: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedRoutes } = await client.models.Route.list()

        return fetchedRoutes
    },
    getRouteById: async (routeId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedRoute } = await client.models.Route.get({ id: routeId })

        if (fetchedRoute) {
            return fetchedRoute
        }

        throw 'Could not get route by id'
    },
    createRoute: async (route: Schema['Route']['createType']) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Route.create(route)
    },
    deleteRoute: async (routeId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Route.delete({ id: routeId })
    },
    setRouteActive: async (routeId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Route.update({ id: routeId, isActive: true })
    },
    setRouteInactive: async (routeId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Route.update({ id: routeId, isActive: false })
    }
}))