import { RIDER_TRACKER_ROLES, RiderTrackerRole, isRiderTrackerRole } from '@/constants/Roles'
import { getHeaviestRole } from '@/helpers/GetHeaviestRole'
import { AuthSession, fetchAuthSession, signOut } from 'aws-amplify/auth'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { UserType } from '@/types/UserType'

interface UserStore {
    heaviestRole: string
    setHeaviestRole(role: string): void
    userFullName: string
    setUserFullName(name: string): void
    userEmail: string
    setUserEmail(email: string): void
    userId: string
    setUserId(id: string): void
    getUserId(forceUpdate?: boolean): Promise<string>
    userPictureUrl: string
    updateUserPictureUrl(): Promise<void>
    userType: string
    updateUserType(): Promise<void>
    updateUserData: () => Promise<void>
    users: UserType[]
    updateUsers: () => Promise<void>
    userSession: AuthSession | undefined
    updateUserSession: (retryCount?: number) => Promise<void>
    searchArg: string
    changeSearchArg(searchArg: string): Promise<void>
    usersFilter(u: UserType): boolean
}

interface StateUpdate {
    userId?: string
    userEmail?: string
    heaviestRole?: string
    userFullName?: string
    searchArg?: string
}

export const useUserStore = create<UserStore>((set, get) => ({
    heaviestRole: RIDER_TRACKER_ROLES.RIDER_TRACKER_UNAUTHENTICATED,
    setHeaviestRole: (role: string) => {
        set({ heaviestRole: role })
    },
    userFullName: '',
    setUserFullName: (name: string) => {
        set({ userFullName: name })
    },
    userEmail: '',
    setUserEmail: (email: string) => {
        set({ userEmail: email })
    },
    userId: '',
    setUserId: (id: string) => {
        set({ userId: id })
    },
    getUserId: async (forceUpdate?: boolean) => {
        let userId: string | undefined = get().userId

        if (!userId || forceUpdate) {
            const session = await fetchAuthSession()
            const id = session.userSub
            set({ userId: id })
            userId = id
        }

        if (userId) {
            return userId
        }

        throw 'Unable to find user id. Is user authenticated?'
    },
    userPictureUrl: '',
    updateUserPictureUrl: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = get().userId

        const user = await api?.users.getUserById(orgId, userId)
        set({ userPictureUrl: `https://s3.us-west-2.amazonaws.com/${user?.profileImageKey}` })
    },
    userType: '',
    updateUserType: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = get().userId

        const user = await api?.users.getUserById(orgId, userId)
        set({ userType: user.userType })
    },
    updateUserData: async () => {
        const stateUpdate: StateUpdate = {}

        try {
            const session = await fetchAuthSession()
            stateUpdate.userId = session.userSub

            const idToken = session.tokens?.idToken
            const payload = idToken?.payload

            if (payload) {
                const sessionGroups = payload['cognito:groups']
                const sessionGroupsArray = (sessionGroups as Array<string>).filter((s) => isRiderTrackerRole(s))
                stateUpdate.userEmail = payload.email?.toString()

                const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(sessionGroupsArray ?? [])
                stateUpdate.heaviestRole = heaviestRoleFromGroups

                const { given_name, family_name } = payload
                stateUpdate.userFullName = `${given_name} ${family_name}`
            }

            get().updateUserType()

            set(stateUpdate)
        } catch {
            signOut()
        }
    },
    users: [],
    updateUsers: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const users = await api?.users.getUsers(orgId)
        set({ users })
    },
    searchArg: '',
    changeSearchArg: async (searchArg: string) => {
        set({ searchArg })

        if (!searchArg) {
            get().updateUsers()
            return
        }

        const users = get().users.filter(get().usersFilter)

        set({ users })
    },
    usersFilter: (u: UserType) => {
        const searchArg = get().searchArg
        const standardizedArg = searchArg.toLowerCase()
        const { firstName, lastName } = u
        const record = `${firstName} ${lastName}`.toLowerCase()

        if (record.includes(standardizedArg)) {
            return true
        }

        return false
    },
    userSession: undefined,
    updateUserSession: async (retryCount?: number) => {
        let retries = retryCount ?? 0
        const retryMax = 3

        const session = await fetchAuthSession()

        if (session.userSub) {
            set({ userSession: session })
            return
        }

        if (retries < retryMax) {
            retries++
            get().updateUserSession(retries)
        }
    }
}))
