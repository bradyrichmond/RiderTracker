import { RiderType } from '@/types/RiderType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface RiderStore {
    addGuardiansToRider(guardianIds: string[], riderId: string): Promise<void>
    addStopToRider(stopId: string, riderId: string): Promise<void>
    changeSearchArg(searchArg: string): Promise<void>
    createRider(rider: RiderType): Promise<void>
    deleteRider(rider: RiderType): Promise<void>
    getRiderById(riderId: string): Promise<RiderType>
    getRiders(): Promise<void>
    riders: RiderType[]
    ridersFilter(r: RiderType): boolean
    searchArg: string
}

export const useRiderStore = create<RiderStore>((set, get) => ({
    addGuardiansToRider: async (guardianIds: string[], riderId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const rider = await get().getRiderById(riderId)

        const currentGuardians = rider.stopIds.filter((s) => s !== '') ?? []

        rider.guardianIds = [...currentGuardians, ...guardianIds]

        await api?.riders.updateRider(orgId, rider.id, rider)
    },
    addStopToRider: async (stopId: string, riderId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const rider = await get().getRiderById(riderId)

        const currentStops = rider.stopIds ?? []
        currentStops.push(stopId)
        rider.stopIds = currentStops

        await api?.riders.updateRider(orgId, rider.id, rider)
    },
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().getRiders()
            return
        }

        const riders = get().riders.filter(get().ridersFilter)

        set({ riders })
    },
    createRider: async (rider: RiderType) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        await api?.riders.createRider(orgId, rider)
        await get().getRiders()
    },
    deleteRider: async (rider: RiderType) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        await api?.riders.deleteRider(orgId, rider.id)

        await get().getRiders()
    },
    getRiders: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedRiders = await api?.riders.getRiders(orgId)

        if (fetchedRiders) {
            set(() => ({ riders: fetchedRiders.filter(get().ridersFilter) }))
        }
    },
    getRiderById: async (riderId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedRider = await api?.riders.getRiderById(orgId, riderId)

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
    searchArg: '',
}))