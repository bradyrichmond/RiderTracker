import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { BusType } from '@/types/AmplifyTypes'

interface BusStore {
    buses: BusType[]
    createBus(busNumber: string): Promise<void>
    deleteBus(busId: string): Promise<void>
    getBusById(busId: string): Promise<BusType>
    updateBuses(): Promise<void>
}

export const useBusStore = create<BusStore>((set, get) => ({
    buses: [],
    createBus: async (busNumber: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const newBus = {
            orgId,
            busNumber
        }

        await client.models.Bus.create(newBus)
        await get().updateBuses()
    },
    deleteBus: async (busId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Bus.delete({ id: busId })
        await get().updateBuses()
    },
    getBusById: async (busId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: bus } = await client.models.Bus.get({ id: busId })

        if (bus) {
            return bus
        }

        throw 'Could not find bus by id'
    },
    updateBuses: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const { data: buses } = await client.models.Bus.listBusByOrgId({ orgId })

        if (buses) {
            set({ buses })
            return
        }

        throw 'Failed to update buses'
    }
}))