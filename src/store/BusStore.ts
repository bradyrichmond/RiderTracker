import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { BusType, UpdateBusTypeInput } from '@/types/AmplifyTypes'
import { useUserStore } from './UserStore'

interface BusStore {
    buses?: BusType[]
    createBus(busNumber: string): Promise<UpdateBusTypeInput>
    buses?: BusType[]
    createBus(busNumber: string): Promise<UpdateBusTypeInput>
    deleteBus(busId: string): Promise<void>
    getBusById(busId: string): Promise<BusType>
    updateBuses(): Promise<void>
}

export const useBusStore = create<BusStore>((set, get) => ({
    buses: [],
    createBus: async (busNumber: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = useUserStore.getState().currentUser?.orgId

        if (!orgId) {
            throw 'Missing orgId'
        }

        const { data: bus } = await client.models.Bus.create({ orgId, busNumber })

        await get().updateBuses()

        if (bus) {
            return bus
        }

        throw 'Failed to create bus'

        if (bus) {
            return bus
        }

        throw 'Failed to create bus'
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
        const orgId = useUserStore.getState().currentUser?.orgId

        if (!orgId) {
            throw 'Missing orgId'
        }

        const { data: buses } = await client.models.Bus.listBusByOrgId({ orgId })

        if (buses) {
            set({ buses: filteredBuses })
            return
        }

        throw 'Failed to update buses'
    }
}))