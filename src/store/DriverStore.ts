import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { UserType } from '@/types/AmplifyTypes'

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
        const { data: drivers } = await client.models.User.list()

        if (drivers) {
            set({ drivers })
        }

        throw 'failed to get drivers'
    },
    deleteDriver: async (driverId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.User.delete({ id: driverId })
        await get().updateDrivers()
    },
    getDriverById: async (driverId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: driver } = await client.models.User.get({ id: driverId })

        if (driver) {
            return driver
        }

        throw 'Unable to find driver by id'
    },
}))