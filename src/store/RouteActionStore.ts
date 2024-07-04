import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { Schema } from '../../amplify/data/resource'

export interface CreateRouteActionInput {
    actionType: Schema['RouteActionTypes']['type']
    driverId: string
    routeId: string
}

interface CreateInput {
    actionType: Schema['RouteActionTypes']['type']
    driverId: string
    id: string
    orgId: string
    routeId: string
}

type RouteActionType = Schema['RouteAction']['type']

interface RouteActionStore {
    routeActions: RouteActionType[],
    updateRouteActions(): Promise<void>
    createRouteAction: (routeActivity: CreateRouteActionInput) => Promise<void>
}


export const useRouteActionStore = create<RouteActionStore>((set) => ({
    routeActions: [],
    updateRouteActions: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: routeActions } = await client.models.RouteAction.list()

        if (routeActions) {
            set({ routeActions })
        }
    },
    createRouteAction: async (routeActionInput: CreateRouteActionInput) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const routeActionId = uuid()

        if (orgId) {
            const action: CreateInput = {
                actionType: routeActionInput.actionType,
                driverId: routeActionInput.driverId,
                id: routeActionId,
                orgId,
                routeId: routeActionInput.routeId
            }

            await client.models.RouteAction.create(action)
        }
    }
}))
