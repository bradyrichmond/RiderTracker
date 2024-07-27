import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { CreateRiderTypeInput, RiderType } from '@/types/AmplifyTypes'
import { useUserStore } from './UserStore'

interface RiderStore {
    assignRiderToGuardian(riderId: string, guardianId: string): Promise<void>
    changeSearchArg(searchArg: string): Promise<void>
    createRider(rider: CreateRiderTypeInput, guardianIds: string[]): Promise<void>
    deleteRider(riderId: string): Promise<void>
    getRiderById(riderId: string): Promise<RiderType>
    updateRiders(): Promise<void>
    riders: RiderType[]
    ridersFilter(r: RiderType): boolean
    searchArg: string
}

export const useRiderStore = create<RiderStore>((set, get) => ({
    assignRiderToGuardian: async (riderId: string, guardianId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.GuardianRider.create({ riderId, guardianId })
    },
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().updateRiders()
            return
        }

        const riders = get().riders.filter(get().ridersFilter)

        set({ riders })
    },
    createRider: async (rider: CreateRiderTypeInput, guardianIds: string[]) => {
        const client = await useApiStore.getState().getClient()
        const orgId = useUserStore.getState().currentUser?.orgId

        if (orgId) {
            const { data: riderData } = await client.models.Rider.create({ ...rider, orgId })
            if (riderData) {
                const riderId = riderData.id

                guardianIds.forEach((g) => get().assignRiderToGuardian(riderId, g))
            }
        }
    },
    deleteRider: async (riderId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Rider.delete({ id: riderId })
    },
    updateRiders: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = useUserStore.getState().currentUser?.orgId

        if (orgId) {
            const { data: riders } = await client.models.Rider.listRiderByOrgId({ orgId })

            if (riders) {
                set({ riders })
            }
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
    ridersFilter: (r: RiderType) => {
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