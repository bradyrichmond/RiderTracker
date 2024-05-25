import { GuardianType } from '@/types/UserType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface GuardianStore {
    guardians: GuardianType[]
    getGuardians(guardianIds?: string[]): Promise<void>
    searchArg: string
    changeSearchArg(searchArg: string): Promise<void>
    guardiansFilter(g: GuardianType): boolean
}

export const useGuardianStore = create<GuardianStore>((set, get) => ({
    guardians: [],
    getGuardians: async (guardianIds?: string[]) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        if (guardianIds) {
            const fetchedGuardians = await api?.users.getBulkGuardiansByIds(orgId, guardianIds)

            if (fetchedGuardians) {
                set({ guardians: fetchedGuardians })
            }

            return
        }

        const fetchedGuardianResponse = await api?.users.getGuardians(orgId)

        const fetchedGuardians = fetchedGuardianResponse?.items

        if (fetchedGuardians) {
            set(() => ({ guardians: fetchedGuardians.filter(get().guardiansFilter) }))
        }
    },
    searchArg: '',
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().getGuardians()
            return
        }

        const guardians = get().guardians.filter(get().guardiansFilter)

        set({ guardians })
    },
    guardiansFilter: (g: GuardianType) => {
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