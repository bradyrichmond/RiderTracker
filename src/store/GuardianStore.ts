import { GuardianType } from '@/types/UserType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { RiderType } from '@/types/RiderType'
import { useRiderStore } from './RiderStore'

interface GuardianStore {
    guardians: GuardianType[]
    getGuardians(guardianIds?: string[]): Promise<void>
    deleteGuardian(guardian: GuardianType): Promise<void>
    searchArg: string
    changeSearchArg(searchArg: string): Promise<void>
    guardiansFilter(g: GuardianType): boolean
    addRiderToGuardian: (guardian: GuardianType, rider: RiderType) => Promise<void>
    getGuardianById: (guardianId: string) => Promise<GuardianType>
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
    getGuardianById: async (guardianId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId
        const guardian = await api?.users.getGuardianById(orgId, guardianId)

        if (guardian) {
            return guardian
        }

        throw 'Failed to get guardian by id'
    },
    deleteGuardian: async (guardian: GuardianType) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api
        const removeGuardianFromRider = useRiderStore.getState().removeGuardianFromRider

        await api?.users.deleteUser(orgId, guardian.id)

        if (guardian.riderIds) {
            for (const riderId of guardian.riderIds) {
                await removeGuardianFromRider(guardian.id, riderId)
            }
        }

        await get().getGuardians()
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
    },
    addRiderToGuardian: async (guardian: GuardianType, rider: RiderType) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        let riderIds: string[] = guardian.riderIds

        if (!riderIds) {
            riderIds = []
        }

        riderIds.push(rider.id)

        await api?.users.updateUser(orgId, guardian.id, { riderIds })
    }
}))