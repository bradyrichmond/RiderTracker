import { create } from 'zustand'
import { UserType } from '@/types/UserType'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { CreateCognitoUserParams } from '@/API/AdminApis'
import { CreateGuardianInput } from '@/routes/Guardians'
import { useAddressStore } from './AddressStore'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { useGuardianStore } from './GuardianStore'
import { useDriverStore } from './DriverStore'
import { useUserStore } from './UserStore'

interface AdminStore {
    admins: UserType[]
    updateAdmins(): Promise<void>
    createAdmin(newAdmin: CreateCognitoUserParams): Promise<void>
    deleteAdmin(adminId: string): Promise<void>
    createGuardian(newAdmin: CreateGuardianInput): Promise<void>
    createDriver(newDriver: CreateCognitoUserParams): Promise<void>
    deleteUser(userId: string): Promise<void>
}

export const useAdminStore = create<AdminStore>((set, get) => ({
    admins: [],
    updateAdmins: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const admins = await api?.users.getAdmins(orgId)
        set({ admins })
    },
    createAdmin: async (newAdmin: CreateCognitoUserParams) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = useUserStore.getState().userId

        await api?.admin.createAdmin(newAdmin, orgId, userId)
        await get().updateAdmins()
    },
    deleteAdmin: async (id: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.admin.disableUser(id)
        await api?.admin.removeUserFromGroup(id, RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN)
        await api?.users.deleteUser(orgId, id)
    },
    createGuardian: async (newGuardian: CreateGuardianInput) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = useUserStore.getState().userId
        const getGuardians = useGuardianStore.getState().getGuardians
        const createAddress = useAddressStore.getState().createAddress

        const address = await createAddress(newGuardian.address)

        if (address) {
            await api?.admin.createGuardian(newGuardian, address, orgId, userId)
            await getGuardians()
        }

        throw 'Failed to create Guardian'
    },
    createDriver: async (newDriver: CreateCognitoUserParams) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = useUserStore.getState().userId
        const updateDrivers = useDriverStore.getState().updateDrivers

        await api?.admin.createDriver(newDriver, orgId, userId)
        await updateDrivers()
    },
    deleteUser: async (userId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.users.deleteUser(orgId, userId)
    }
}))