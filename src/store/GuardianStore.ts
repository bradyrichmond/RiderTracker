import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { GuardianType, UserType } from '@/types/AmplifyTypes'
import { useUserStore } from './UserStore'

interface GuardianStore {
    changeSearchArg(searchArg: string): Promise<void>
    deleteGuardian(guardian: UserType): Promise<void>
    getGuardianById: (guardianId: string) => Promise<UserType>
    updateGuardians(guardianIds?: string[]): Promise<void>
    guardians: UserType[]
    guardiansFilter(g: UserType): boolean
    searchArg: string
}

export const useGuardianStore = create<GuardianStore>((set, get) => ({
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().updateGuardians()
            return
        }

        const guardians = get().guardians.filter(get().guardiansFilter)

        set({ guardians })
    },
    deleteGuardian: async (guardian: UserType) => {
        const client = await useApiStore.getState().getClient()
        await client.models.User.delete({ id: guardian.id })
    },
    getGuardianById: async (guardianId: string) => {
        const client = await useApiStore.getState().getClient()
        const { data: guardian } = await client.models.User.get({ id: guardianId })

        if (guardian) {
            return guardian
        }

        throw 'Failed to get guardian by id'
    },
    updateGuardians: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = useUserStore.getState().currentUser?.orgId

        if (!orgId) {
            throw 'User missing orgId'
        }

        const { data: guardianItems } = await client.models.Guardian.listGuardianByOrgId({ orgId })
        const guardianItemsFiltered = guardianItems.filter((g) => !!g)
        const guardianDatum = await Promise.all(guardianItemsFiltered.map(async (g: GuardianType) => await g.user()))
        const guardians = guardianDatum.map((g) => g.data).filter((g) => !!g)

        if (guardians) {
            set({ guardians })
        }

        throw 'failed to get guardians'
    },
    guardians: [],
    guardiansFilter: (g: UserType) => {
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