import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { RouteActionType } from '@/types/RouteActionType'

interface RouteActionStore {
    routeActions: RouteActionType[],
    updateRouteActions(): Promise<void>
    createRouteAction(routeActivity: RouteActionType): Promise<void>
    getRouteActionsByDriverId(driverId: string): Promise<RouteActionType[]>
    getRouteActionsByDriverId(driverId: string): Promise<RouteActionType[]>
}

const dateCompare = (a: RouteActionType, b: RouteActionType) => {
    return Number(a.createdDate) - Number(b.createdDate)
}

export const useRouteActionStore = create<RouteActionStore>((set) => ({
    routeActions: [],
    updateRouteActions: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const routeActions = await api?.routeActions.getRouteActions(orgId)
        set({ routeActions })
    },
    createRouteAction: async (action: RouteActionType) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const routeActionId = uuid()

        action.id = routeActionId

        if (!action.actionType) {
            await api?.routeActions.createRouteAction(orgId, action)
            return
        }

        throw 'Failed to create address'
    },
    getRouteActionsByDriverId: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const routeActionsResponse = await api?.routeActions.getRouteActions(orgId)
        const routeActions = routeActionsResponse.sort(dateCompare)
        return routeActions
    },
    getRouteActionsByRouteId: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const routeActionsResponse = await api?.routeActions.getRouteActions(orgId)
        const routeActions = routeActionsResponse.sort(dateCompare)
        return routeActions
    }
}))
