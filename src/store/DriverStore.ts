import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { DriverType, UserType } from '@/types/AmplifyTypes'
import { useUserStore } from './UserStore'

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
        const orgId = useUserStore.getState().currentUser?.orgId

        if (!orgId) {
            throw 'User missing orgId'
        }

        const { data: driverItems } = await client.models.Driver.listDriverByOrgId({ orgId })
        const driverItemsFiltered = driverItems.filter((d) => !!d)
        const driverDatum = await Promise.all(driverItemsFiltered.map(async (d: DriverType) => await d.user()))
        const drivers = driverDatum.map((d) => d.data).filter((d) => !!d)

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