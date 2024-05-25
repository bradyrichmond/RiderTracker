import { RiderType } from '@/types/RiderType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface RiderStore {
    riders: RiderType[]
    getRiders(riderIds?: string[]): Promise<void>
    searchArg: string
    changeSearchArg(searchArg: string): Promise<void>
    ridersFilter(g: RiderType): boolean
}

export const useRiderStore = create<RiderStore>((set, get) => ({
    riders: [],
    getRiders: async (riderIds?: string[]) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        if (riderIds) {
            const fetchedRiders = await api?.riders.getBulkRidersByIds(orgId, riderIds)

            if (fetchedRiders) {
                set({ riders: fetchedRiders })
            }

            return
        }

        const fetchedRiders = await api?.riders.getRiders(orgId)

        if (fetchedRiders) {
            set(() => ({ riders: fetchedRiders.filter(get().ridersFilter) }))
        }
    },
    searchArg: '',
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().getRiders()
            return
        }

        const riders = get().riders.filter(get().ridersFilter)

        set({ riders })
    },
    ridersFilter: (g: RiderType) => {
        const searchArg = get().searchArg
        const standardizedArg = searchArg.toLowerCase()
        const { firstName, lastName } = g
        const record = `${firstName} ${lastName}`.toLowerCase()

        if (record.includes(standardizedArg)) {
            return true
        }

        return false
    }
}))