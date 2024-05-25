import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { useRouteStore } from './RouteStore'
import { StopType } from '@/types/StopType'
import { RiderType } from '@/types/RiderType'

interface StopStore {
    stops: StopType[]
    getStops(stopIds?: string[]): Promise<void>
    getStopById(stopId: string): Promise<StopType>
    createStop(stop: StopType): Promise<void>
    deleteStop(stopId: string): Promise<void>
    addRiderToStop(rider: RiderType, stop: StopType): Promise<void>
}

export const useStopStore = create<StopStore>((set, get) => ({
    stops: [],
    getStops: async (stopIds?: string[]) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        if (stopIds) {
            const fetchedStops = await api?.stops.getBulkStopsByIds(orgId, stopIds)

            if (fetchedStops) {
                set({ stops: fetchedStops })
            }

            return
        }

        const fetchedStops = await api?.stops.getStops(orgId)

        if (fetchedStops) {
            set(() => ({ stops: fetchedStops }))
        }
    },
    getStopById: async (stopId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        const fetchedStop = await api?.stops.getStopById(orgId, stopId)

        if (fetchedStop) {
            return fetchedStop
        }

        throw 'Could not get route by id'
    },
    createStop: async (stop: StopType) => {
        const orgId = stop.orgId
        const api = useApiStore.getState().api
        const addStopToRoute = useRouteStore.getState().addStopToRoute
        const getRouteById = useRouteStore.getState().getRouteById

        await api?.stops.createStop(orgId, stop)
        await get().getStops()

        const route = await getRouteById(stop.routeId)

        if (route) {
            await addStopToRoute(route, stop)
        }

        await get().getStops()
    },
    deleteStop: async (stopId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api
        await api?.stops.deleteStop(orgId, stopId)
        await get().getStops()
    },
    addRiderToStop: async (rider: RiderType, stop: StopType) => {
        const api = useApiStore.getState().api

        if (!stop.riderIds) {
            stop.riderIds = []
        }

        stop.riderIds.push(rider.id)
        await api?.stops.updateStop(stop.orgId, stop.id, stop)
    }
}))