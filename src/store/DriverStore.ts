import { create } from 'zustand'
import { UserType } from '@/types/UserType'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface DriverStore {
    drivers: UserType[]
    updateDrivers(): Promise<void>
    deleteDriver(driverId: string): Promise<void>
    getDriverById(driverId: string): Promise<UserType>
}

export const useDriverStore = create<DriverStore>((set, get) => ({
    drivers: [],
    updateDrivers: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const drivers = await api?.users.getDrivers(orgId)

        set({ drivers })
    },
    deleteDriver: async (driverId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.users.deleteUser(orgId, driverId)
        await get().updateDrivers()
    },
    getDriverById: async (driverId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const driver = api?.users.getDriverById(orgId, driverId)

        if (driver) {
            return driver
        }

        throw 'Unable to find driver by id'
    },
}))