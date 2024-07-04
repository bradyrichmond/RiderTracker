import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'

type StopType = Schema['Stop']['type']

interface StopStore {
    stops: StopType[]
    getStops(): Promise<void>
    getStopById(stopId: string): Promise<StopType>
    createStop(stop: Schema['Stop']['createType']): Promise<void>
    deleteStop(stopId: string): Promise<void>
}

export const useStopStore = create<StopStore>((set) => ({
    stops: [],
    getStops: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedStops } = await client.models.Stop.list()

        if (fetchedStops) {
            set({ stops: fetchedStops })
        }
    },
    getStopById: async (stopId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedStop } = await client.models.Stop.get({ id: stopId })

        if (fetchedStop) {
            return fetchedStop
        }

        throw 'Could not get route by id'
    },
    createStop: async (stop: Schema['Stop']['createType']) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Stop.create(stop)
    },
    deleteStop: async (stopId: string) => {
        const client = await useApiStore.getState().getClient()
        await client.models.Stop.delete({ id: stopId })
    }
}))