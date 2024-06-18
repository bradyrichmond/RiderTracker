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
    createRouteAction: async (routeActionInput: CreateRouteActionInput) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = useUserStore().userId

        const routeActionId = uuid()

        const action: RouteActionType = {
            actionType: routeActionInput.actionType,
            driverId: routeActionInput.driverId,
            id: routeActionId,
            orgId,
            routeId: routeActionInput.routeId,
            createdBy: userId,
            createdDate: new Date().getTime(),
            lastEditedBy: userId,
            lastEditDate: new Date().getTime()
        }

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
