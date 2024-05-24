import RiderTrackerAPI from '@/API'
import { create } from 'zustand'

interface ApiStore {
    api: RiderTrackerAPI | undefined
    updateApi(): Promise<void>
}

export const useApiStore = create<ApiStore>((set) => ({
    api: undefined,
    updateApi: async () => {
        const newClient = await RiderTrackerAPI.getClient()
        set({ api: newClient })
    }
}))