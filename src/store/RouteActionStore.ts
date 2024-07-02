import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { ActionType, RouteActionType } from '@/types/RouteActionType'
import { useUserStore } from './UserStore'

export interface CreateRouteActionInput {
    actionType: ActionType
    driverId: string
    routeId: string
}

interface RouteActionStore {
    routeActions: RouteActionType[],
    updateRouteActions(): Promise<void>
    createRouteAction: (routeActivity: CreateRouteActionInput) => Promise<void>
    getRouteActionsByDriverId(driverId: string): Promise<RouteActionType[]>
    getRouteActionsByDriverId(driverId: string): Promise<RouteActionType[]>
}

const dateCompare = (a: RouteActionType, b: RouteActionType) => {
    return Number(a.createdAt) - Number(b.createdAt)
}

export const useRouteActionStore = create<RouteActionStore>((set) => ({
    routeActions: [],
    updateRouteActions: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const routeActions = await api?.routeActions.getRouteActions(orgId)
        set({ routeActions })
    },
    createRouteAction: async (routeActionInput: CreateRouteActionInput) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const userId = useUserStore.getState().userId

        const routeActionId = uuid()

        const action: RouteActionType = {
            actionType: routeActionInput.actionType,
            driverId: routeActionInput.driverId,
            id: routeActionId,
            orgId,
            routeId: routeActionInput.routeId,
            createdBy: userId,
            createdAt: new Date().getTime(),
            updatedBy: userId,
            updatedAt: new Date().getTime()
        }

        await api?.routeActions.createRouteAction(orgId, action)
    },
    getRouteActionsByDriverId: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const routeActionsResponse = await api?.routeActions.getRouteActions(orgId)
        const routeActions = routeActionsResponse.sort(dateCompare)
        return routeActions
    },
    getRouteActionsByRouteId: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const routeActionsResponse = await api?.routeActions.getRouteActions(orgId)
        const routeActions = routeActionsResponse.sort(dateCompare)
        return routeActions
    }
}))
