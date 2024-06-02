import RiderTrackerAPI from '@/API'
import { create } from 'zustand'

interface ApiStore {
    api: RiderTrackerAPI | undefined
    getApi(): Promise<RiderTrackerAPI>
    updateApi(): Promise<RiderTrackerAPI>
}

export const useApiStore = create<ApiStore>((set, get) => ({
    api: undefined,
    getApi: async () => {
        const api = get().api

        if (!api) {
            const newApi = await get().updateApi()
            set({ api: newApi })
            return newApi
        }

        return api
    },
    updateApi: async () => {
        const newClient = await RiderTrackerAPI.getClient()
        return newClient
    }
}))