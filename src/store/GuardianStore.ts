import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'

type GuardianType = Schema['User']['type']

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
    getGuardians: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: fetchedGuardians } = await client.models.User.list()
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