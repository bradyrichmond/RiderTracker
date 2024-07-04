import { create } from 'zustand'
import { useApiStore } from './ApiStore'

import { Schema } from '../../amplify/data/resource'

interface RiderStore {
    changeSearchArg(searchArg: string): Promise<void>
    createRider(rider: Schema['Rider']['createType']): Promise<void>
    deleteRider(riderId: string): Promise<void>
    getRiderById(riderId: string): Promise<Schema['Rider']['type']>
    getRiders(): Promise<void>
    riders: Schema['Rider']['type'][]
    ridersFilter(r: Schema['Rider']['type']): boolean
    searchArg: string
}

export const useRiderStore = create<RiderStore>((set, get) => ({
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().getRiders()
            return
        }

        const riders = get().riders.filter(get().ridersFilter)

        set({ riders })
    },
    createRider: async (rider: Schema['Rider']['createType']) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Rider.create(rider)
    },
    deleteRider: async (riderId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Rider.delete({ id: riderId })
    },
    getRiders: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: riders } = await client.models.Rider.list()

        if (riders) {
            set({ riders })
        }
    },
    getRiderById: async (riderId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedRider } = await client.models.Rider.get({ id: riderId })

        if (fetchedRider) {
            return fetchedRider
        }

        throw 'Could not get rider by id'
    },
    riders: [],
    ridersFilter: (r: Schema['Rider']['type']) => {
        const searchArg = get().searchArg
        const standardizedArg = searchArg.toLowerCase()
        const { firstName, lastName } = r
        const record = `${firstName} ${lastName}`.toLowerCase()

        if (!r) {
            return false
        }

        if (record.includes(standardizedArg)) {
            return true
        }

        return false
    },
    searchArg: ''
}))