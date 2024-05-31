import { create } from 'zustand'
import { UserType } from '@/types/UserType'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { CreateCognitoUserParams } from '@/API/AdminApis'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'

interface DriverStore {
    drivers: UserType[]
    updateDrivers(): Promise<void>
    createDriver(driver: CreateCognitoUserParams): Promise<void>
    deleteDriver(driverId: string): Promise<void>
    getDriverById(driverId: string): Promise<UserType>
}

export const useDriverStore = create<DriverStore>((set, get) => ({
    drivers: [],
    updateDrivers: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId
        const drivers = await api?.users.getDrivers(orgId)

        set({ drivers })
    },
    createDriver: async (newUser: CreateCognitoUserParams) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const cognitoUser = await api?.admin.createCognitoUser(newUser)

        if (cognitoUser) {
            const newUserId = cognitoUser?.User.Username

            const builtUser: UserType = {
                id: newUserId,
                orgId: orgId,
                firstName: newUser.given_name,
                lastName: newUser.family_name,
                email: newUser.email,
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER
            }

            await api?.admin.createUser(orgId, builtUser)
            await get().updateDrivers()
        }
    },
    deleteDriver: async (driverId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        await api?.users.deleteUser(orgId, driverId)
        await get().updateDrivers()
    },
    getDriverById: async (driverId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const driver = api?.users.getDriverById(orgId, driverId)

        if (driver) {
            return driver
        }

        throw 'Unable to find driver by id'
    },
}))