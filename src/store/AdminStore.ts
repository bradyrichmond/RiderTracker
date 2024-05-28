import { create } from 'zustand'
import { UserType } from '@/types/UserType'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { CreateCognitoUserParams } from '@/API/AdminApis'

interface AdminStore {
    admins: UserType[]
    updateAdmins(): Promise<void>
    createAdmin(newAdmin: CreateCognitoUserParams): Promise<void>
}

export const useAdminStore = create<AdminStore>((set, get) => ({
    admins: [],
    updateAdmins: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const admins = await api?.users.getAdmins(orgId)
        set({ admins })
    },
    createAdmin: async (newAdmin: CreateCognitoUserParams) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        await api?.admin.createAdmin(newAdmin, orgId)
        await get().updateAdmins()
    }
}))