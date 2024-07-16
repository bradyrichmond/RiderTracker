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
    addUserToOrg(admin: CreateUserTypeInput): Promise<UserType>
    createDriver(driver: CreateCognitoUserInput): Promise<UserType>
    createUser(admin: CreateUserTypeInput): Promise<UserType>
    currentUser?: UserType
    fullName?: string
    getUsers(): Promise<UserType[]>
    signOutAws(): Promise<void>
    updateUserData(): Promise<void>
    users: UserType[]
}

export const useUserStore = create<UserStore>((set, get) => ({
    addUserToOrg: async (user: UserType) => {
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.User.create(user)

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
        })

        if (createCognitoUserData) {
            user.id = createCognitoUserData.User?.Username
            return await get().addUserToOrg(user)
        }

        throw 'Failed to create admin'
    },
    currentUser: undefined,
    getUsers: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = get().currentUser?.orgId

        if (!orgId) {
            throw 'No orgId for user'
        }

        const { data } = await client.models.User.listUserByOrgId({ orgId })

        set({ users: data })
        return data
    },
    signOutAws: async () => {
        await signOut()
        set({ currentUser: undefined })
    },
    updateUserData: async () => {
        const client = await useApiStore.getState().getClient(true)
        const session = await fetchAuthSession()
        const userId = session.userSub

        if (userId) {
            const { data: currentUser } = await client.models.User.get({ id: userId })

            if (currentUser) {
                set({ currentUser, fullName: `${currentUser.firstName} ${currentUser.lastName}` })
            }
        }
    },
    users: []
}))
