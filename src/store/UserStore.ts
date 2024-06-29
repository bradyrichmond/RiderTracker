import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'

export interface AdminInput {
    id?: string
    firstName: string
    lastName: string
    orgId: string
    email: string
    title: string
}

interface UserStore {
    createAdmin(admin: AdminInput): Promise<Schema['Admin']['type']>
    addAdmin(admin: AdminInput): Promise<Schema['Admin']['type']>
}

export const useUserStore = create<UserStore>(() => ({
    addAdmin: async (admin: AdminInput) => {
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.Admin.create(admin)

        if (data) {
            return data
        }

        throw 'Failed to add admin to org'
    },
    createAdmin: async (admin: AdminInput) => {
        const client = await useApiStore.getState().getClient()

        const { data: createCognitoUserData } = await client.mutations.createOrgAdmin({
            email: admin.email,
            family_name: admin.lastName,
            given_name: admin.firstName
        })

        if (createCognitoUserData) {
            admin.id = createCognitoUserData.User?.Username
            const { data } = await client.models.Admin.create(admin)

            if (data) {
                return data
            }
        }

        throw 'Failed to create admin'
    }
}))
