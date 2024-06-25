import { GuardianType } from '@/types/UserType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface GuardianStore {
    changeSearchArg(searchArg: string): Promise<void>
    deleteGuardian(guardian: GuardianType): Promise<void>
    getGuardianById: (guardianId: string) => Promise<GuardianType>
    getGuardians(guardianIds?: string[]): Promise<void>
    guardians: GuardianType[]
    guardiansFilter(g: GuardianType): boolean
    searchArg: string
}

export const useGuardianStore = create<GuardianStore>((set, get) => ({
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().getGuardians()
            return
        }

        const guardians = get().guardians.filter(get().guardiansFilter)

        set({ guardians })
    },
    deleteGuardian: async (guardian: GuardianType) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        await api?.users.deleteUser(orgId, guardian.id)

        await get().getGuardians()
    },
    getGuardianById: async (guardianId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const guardian = await api?.users.getGuardianById(orgId, guardianId)

        if (guardian) {
            return guardian
        }

        throw 'Failed to get guardian by id'
    },
    getGuardians: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedGuardians = await api?.users.getGuardians(orgId)
        set({ guardians: fetchedGuardians })
    },
    guardians: [],
    guardiansFilter: (g: GuardianType) => {
        const searchArg = get().searchArg
        const standardizedArg = searchArg.toLowerCase()
        const { firstName, lastName } = g
        const record = `${firstName} ${lastName}`.toLowerCase()

        if (record.includes(standardizedArg)) {
            return true
        }

        return false
    },
    searchArg: ''
}))