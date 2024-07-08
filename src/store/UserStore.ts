import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { fetchAuthSession } from 'aws-amplify/auth'
import { signOut } from 'aws-amplify/auth'
import { useOrgStore } from './OrgStore'
import { CreateUserTypeInput, UserType } from '@/types/AmplifyTypes'


export interface CreateCognitoUserInput {
    family_name: string
    given_name: string
    email: string
}

interface UserStore {
    addUserToAdminGroup(admin: UserType): Promise<void>
    addUserToOrg(admin: CreateUserTypeInput): Promise<UserType>
    createDriver(driver: CreateCognitoUserInput): Promise<UserType>
    createUser(admin: CreateUserTypeInput): Promise<UserType>
    currentUser?: UserType
    fullName?: string
    getUserById(id: string): Promise<UserType>
    getUsers(): Promise<UserType[]>
    signOutAws(): Promise<void>
    updateUserData(): Promise<void>
    users: UserType[]
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
    createDriver: async (driver: CreateCognitoUserInput) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const newDriver = {
            orgId,
            firstName: driver.given_name,
            lastName: driver.family_name,
            email: driver.email
        }

        const response = await get().createUser(newDriver)

        await client.mutations.addUserToGroup({ userId: response.id, groupName: 'DRIVERS' })
        await get().addUserToOrg(response)

        return response
    },
    createUser: async (user: CreateUserTypeInput) => {
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
    getUserById: async (id: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: userData } = await client.queries.getUserById({ id })

        if (userData) {
            return userData
        }

        throw `Unable to find user with id: ${id}`
    },
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
            const { data: currentUser } = await client.queries.getCurrentUser()

            if (currentUser) {
                set({ currentUser, fullName: `${currentUser.firstName} ${currentUser.lastName}` })
            }
        }
    },
    users: []
}))
