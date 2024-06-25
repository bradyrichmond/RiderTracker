import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { StopType } from '@/types/StopType'

interface StopStore {
    stops: StopType[]
    getStops(): Promise<void>
    getStopById(stopId: string): Promise<StopType>
    createStop(stop: StopType): Promise<void>
    deleteStop(stopId: string): Promise<void>
}

export const useStopStore = create<StopStore>((set, get) => ({
    stops: [],
    getStops: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedStops = await api?.stops.getStops(orgId)

        if (fetchedStops) {
            set(() => ({ stops: fetchedStops }))
        }
    },
    getStopById: async (stopId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedStop = await api?.stops.getStopById(orgId, stopId)

        if (fetchedStop) {
            return fetchedStop
        }

        throw 'Could not get route by id'
    },
    createStop: async (stop: StopType) => {
        const orgId = stop.orgId
        const api = await useApiStore.getState().getApi()

        await api?.stops.createStop(orgId, stop)
        await get().getStops()
    },
    deleteStop: async (stopId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()
        await api?.stops.deleteStop(orgId, stopId)
        await get().getStops()
    }
}))