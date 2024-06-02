import { create } from 'zustand'
import { UserType } from '@/types/UserType'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { CreateCognitoUserParams } from '@/API/AdminApis'
import { CreateGuardianInput } from '@/routes/Guardians'
import { useAddressStore } from './AddressStore'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { useGuardianStore } from './GuardianStore'

interface AdminStore {
    admins: UserType[]
    updateAdmins(): Promise<void>
    createAdmin(newAdmin: CreateCognitoUserParams): Promise<void>
    deleteAdmin(adminId: string): Promise<void>
    createGuardian(newAdmin: CreateGuardianInput): Promise<void>
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

        await api?.admin.createAdmin(newAdmin, orgId)
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
        const getGuardians = useGuardianStore.getState().getGuardians
        const createAddress = useAddressStore.getState().createAddress

        const address = await createAddress(newGuardian.address)

        if (address) {
            await api?.admin.createGuardian(newGuardian, address, orgId)
            await getGuardians()
            return
        }

        throw 'Failed to create Guardian'
    },
    deleteUser: async (userId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.users.deleteUser(orgId, userId)
    }
}))