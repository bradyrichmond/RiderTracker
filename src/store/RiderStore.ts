import { RiderType } from '@/types/RiderType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { useGuardianStore } from './GuardianStore'
import { useStopStore } from './StopStore'

interface RiderStore {
    riders: RiderType[]
    getRiders(riderIds?: string[]): Promise<void>
    getRiderById(riderId: string): Promise<RiderType>
    createRider(rider: RiderType): Promise<void>
    deleteRider(riderId: string): Promise<void>
    searchArg: string
    changeSearchArg(searchArg: string): Promise<void>
    ridersFilter(r: RiderType): boolean
    removeGuardianFromRider(guardianId: string, riderId: string): Promise<void>
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
    getRiderById: async (riderId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api

        const fetchedRider = await api?.riders.getRiderById(orgId, riderId)

        if (fetchedRider) {
            return fetchedRider
        }

        throw 'Could not get rider by id'
    },
    createRider: async (rider: RiderType) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId
        const addRiderToGuardian = useGuardianStore.getState().addRiderToGuardian
        const getGuardianById = useGuardianStore.getState().getGuardianById

        await api?.riders.createRider(orgId, rider)
        await get().getRiders()

        const guardianIds = rider.guardianIds
        if (guardianIds) {
            for (const guardianId of guardianIds) {
                const guardian = await getGuardianById(guardianId)
                await addRiderToGuardian(guardian, rider)
            }
        }

        const stopIds = rider.stopIds
        if (stopIds) {
            for (const stopId of stopIds) {
                const stop = await useStopStore.getState().getStopById(stopId)
                await useStopStore.getState().addRiderToStop(rider, stop)
            }
        }
    },
    deleteRider: async (riderId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api
        await api?.riders.deleteRider(orgId, riderId)
        await get().getRiders()
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
    ridersFilter: (r: RiderType) => {
        const searchArg = get().searchArg
        const standardizedArg = searchArg.toLowerCase()
        const { firstName, lastName } = r
        const record = `${firstName} ${lastName}`.toLowerCase()

        if (record.includes(standardizedArg)) {
            return true
        }

        return false
    },
    removeGuardianFromRider: async (guardianId: string, riderId: string) => {
        const rider = await get().getRiderById(riderId)
        const api = useApiStore.getState().api
        const newGuardianIds = rider.guardianIds?.filter((g: string) => g !== guardianId)
        rider.guardianIds = newGuardianIds ?? ['']

        await api?.riders.updateRider(rider.orgId, rider.id, rider)
    }
}))