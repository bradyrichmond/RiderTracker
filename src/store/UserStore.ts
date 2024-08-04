import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { fetchAuthSession } from 'aws-amplify/auth'
import { signOut } from 'aws-amplify/auth'
import { useOrgStore } from './OrgStore'
import { CreateUserTypeInput, UserType } from '@/types/AmplifyTypes'
import { useAddressStore } from './AddressStore'
import { ROUTE_PROTECTION, RouteProtectionItem } from '@/constants/RouteProtection'

export interface CreateCognitoUserInput {
    family_name: string
    given_name: string
    email: string
}

export interface CreateGuardianInput {
    family_name: string
    given_name: string
    email: string
    address: string
}

interface UserStore {
    addUserToOrg(admin: CreateUserTypeInput): Promise<UserType>
    createDriver(driver: CreateCognitoUserInput): Promise<UserType>
    createGuardian(driver: CreateCognitoUserInput): Promise<UserType>
    createUser(admin: CreateUserTypeInput): Promise<UserType>
    currentUser?: UserType
    fullName?: string
    getUserById(id: string): Promise<UserType>
    routePermissions?: RouteProtectionItem
    signOutAws(): Promise<void>
    updateUsers(): Promise<void>
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
            email: driver.email,
            firstName: driver.given_name,
            isDriver: true,
            lastName: driver.family_name,
            orgId
        }

        const response = await get().createUser(newDriver)
        const userId = response.id

        await client.mutations.addUserToGroup({ userId, groupName: 'DRIVERS' })

        return response
    },
    createGuardian: async (guardian: CreateGuardianInput) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const createAddress = useAddressStore.getState().createAddress

        const { address } = guardian
        const { data: validatedAddress } = await client.mutations.validateAddress({ address })

        if (!validatedAddress) {
            throw 'Invalid Address'
        }

        const newGuardian = {
            email: guardian.email,
            firstName: guardian.given_name,
            isGuardian: true,
            lastName: guardian.family_name,
            orgId
        }

        const response = await get().createUser(newGuardian)
        const userId = response.id

        if (!userId) {
            throw 'Failed to create user'
        }

        try {
            await client.mutations.addUserToGroup({ userId, groupName: 'GUARDIANS' })
        } catch {
            throw 'Failed to set user as Guardian'
        }

        try {
            await createAddress({ ...validatedAddress, orgId })
        } catch {
            throw 'Failed to create address'
        }

        return response
    },
    createUser: async (user: CreateUserTypeInput) => {
        const client = await useApiStore.getState().getClient()
        const email = user.email

        if (!email) {
            throw 'Email address is required'
        }

        const { data: createCognitoUserData } = await client.mutations.createOrgUser({
            email: email,
            family_name: user.lastName,
            given_name: user.firstName,
            orgId: user.orgId
        })

        if (createCognitoUserData) {
            user.id = createCognitoUserData.User?.Username
            return await get().addUserToOrg(user)
        }

        throw 'Failed to create user'
    },
    currentUser: undefined,
    getUserById: async (id: string) => {
        const client = await useApiStore.getState().getClient()
        const { data: user } = await client.models.User.get({ id })

        if (user) {
            return user
        }

        throw 'Could not find user by id'
    },
    routePermissions: ROUTE_PROTECTION.isUnauthenticated,
    signOutAws: async () => {
        await signOut()
        set({ currentUser: undefined })
    },
    updateUsers: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = get().currentUser?.orgId

        if (!orgId) {
            throw 'No orgId for user'
        }

        const { data } = await client.models.User.listUserByOrgId({ orgId })

        set({ users: data })
    },
    updateUserData: async () => {
        const client = await useApiStore.getState().getClient()
        const session = await fetchAuthSession()
        const userId = session.userSub

        if (userId) {
            const { data: currentUser } = await client.models.User.get({ id: userId })

            if (currentUser) {
                const routePermissions = _generateRoutePermissions(currentUser)
                set({ currentUser, fullName: `${currentUser.firstName} ${currentUser.lastName}`, routePermissions })
            }
        }
    },
    users: []
}))

const _generateRoutePermissions = (currentUser: UserType) => {
    if (currentUser.isAdmin) {
        return ROUTE_PROTECTION.isAdmin
    }

    if (currentUser.isDriver) {
        return ROUTE_PROTECTION.isDriver
    }

    if (currentUser.isGuardian) {
        return ROUTE_PROTECTION.isGuardian
    }

    return ROUTE_PROTECTION.isUnauthenticated
}
