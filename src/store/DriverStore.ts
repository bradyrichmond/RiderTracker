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
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const drivers = await api?.users.getDrivers(orgId)

        set({ drivers })
    },
    deleteDriver: async (driverId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        await api?.users.deleteUser(orgId, driverId)
        await get().updateDrivers()
    },
    getDriverById: async (driverId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const driver = api?.users.getDriverById(orgId, driverId)

        if (driver) {
            return driver
        }

        throw 'Unable to find driver by id'
    },
}))