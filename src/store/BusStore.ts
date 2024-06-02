import { BusType } from '@/types/BusType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'

interface BusStore {
    buses: BusType[]
    updateBuses(): Promise<void>
    createBus(): Promise<void>
    deleteBus(busId: string): Promise<void>
    getBusById(busId: string): Promise<BusType>
}

export const useBusStore = create<BusStore>((set, get) => ({
    buses: [],
    updateBuses: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const buses = await api?.buses.getBuses(orgId)

        set({ buses })
    },
    getBusById: async (busId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const bus = await api?.buses.getBusById(orgId, busId)

        if (bus) {
            return bus
        }

        throw 'Could not find bus by id'
    },
    createBus: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const newBusId = uuid()
        const newBus = {
            id: newBusId,
            orgId
        }

        await api?.buses.createBus(orgId, newBus)
        await get().updateBuses()
    },
    deleteBus: async (busId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.buses.deleteBus(orgId, busId)
        await get().updateBuses()
    }
}))