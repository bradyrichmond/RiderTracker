import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'
import { fetchAuthSession } from 'aws-amplify/auth'
import { signOut } from 'aws-amplify/auth'

export interface UserType {
    id?: string
    email?: string
    firstName: string
    lastName: string
    orgId: string
    title?: string
}

interface UserStore {
    addUserToAdminGroup(admin: UserType): Promise<void>
    addUserToOrg(admin: UserType): Promise<Schema['User']['type']>
    createUser(admin: UserType): Promise<Schema['User']['type']>
    currentUser?: Schema['User']['type']
    fullName?: string
    getUsers(): Promise<(Schema['User']['type'])[]>
    signOutAws(): Promise<void>
    updateUserData(): Promise<void>
    users: (Schema['User']['type'])[]
    userGroups: string[]
}

export const useUserStore = create<UserStore>((set, get) => ({
    addUserToAdminGroup: async (admin: UserType) => {
        const client = await useApiStore.getState().getClient()

        if (admin.id) {
            await client.mutations.addUserToGroup({ userId: admin.id, groupName: 'Admins' })

            const { data: org } = await client.models.Organization.get({ id: admin.orgId }, { authMode: 'userPool' })

            if (org) {
                const { admins } = org
                let newAdmins = admins

                if (!newAdmins) {
                    newAdmins = []
                }

                newAdmins?.push(admin.id)

                await client.models.Organization.update({ id: org.id, admins: newAdmins })
                return
            }
        }

        throw 'Failed to add admin to org'
    },
    addUserToOrg: async (user: UserType) => {
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.User.create(user, { authMode: 'userPool' })

        if (data) {
            return data
        }

        throw 'Failed to add user to org'
    },
    createUser: async (user: UserType) => {
        const client = await useApiStore.getState().getClient()

        const { data: createCognitoUserData } = await client.mutations.createOrgUser({
            email: user.email ?? '',
            family_name: user.lastName,
            given_name: user.firstName,
            orgId: user.orgId
        }, { authMode: 'userPool' })

        if (createCognitoUserData) {
            user.id = createCognitoUserData.User?.Username
            return await get().addUserToOrg(user)
        }

        throw 'Failed to create admin'
    },
    currentUser: undefined,
    getUsers: async () => {
        const client = await useApiStore.getState().getClient()

        const { data } = await client.models.User.list({ authMode: 'userPool' })

        set({ users: data })
        return data
    },
    signOutAws: async () => {
        await signOut()
        set({ currentUser: undefined })
    },
    updateUserData: async () => {
        const client = await useApiStore.getState().getClient()
        const session = await fetchAuthSession()
        const userId = session.userSub

        if (userId) {
            const { data: currentUser } = await client.models.User.get({ id: userId }, { authMode: 'userPool' })
            if (currentUser) {
                set({ currentUser, fullName: `${currentUser.firstName} ${currentUser.lastName}` })
            }
        }

        const accessToken = session.tokens?.accessToken

        if (accessToken) {
            const groups = accessToken.payload['cognito:groups'] as string[]
            set({ userGroups: groups })
        }
    },
    users: [],
    userGroups: []
}))
