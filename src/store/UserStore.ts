import { RiderTrackerRole, isRiderTrackerRole } from '@/constants/Roles'
import { getHeaviestRole } from '@/helpers/GetHeaviestRole'
import { fetchAuthSession, signOut } from 'aws-amplify/auth'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface UserStore {
    heaviestRole: string
    setHeaviestRole(role: string): void
    userFullName: string
    setUserFullName(name: string): void
    userEmail: string
    setUserEmail(email: string): void
    userId: string
    setUserId(id: string): void
    userPictureUrl: string
    updateUserPictureUrl(): Promise<void>
    updateUserData: () => Promise<void>
}

interface StateUpdate {
    userId?: string
    userEmail?: string
    heaviestRole?: string
    userFullName?: string
}

export const useUserStore = create<UserStore>((set, get) => ({
    heaviestRole: '',
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
    userPictureUrl: '',
    updateUserPictureUrl: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId
        const userId = get().userId

        const user = await api?.users.getUserById(orgId, userId)
        set({ userPictureUrl: `https://s3.us-west-2.amazonaws.com/${user?.profileImageKey}` })
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

            set(stateUpdate)
        } catch {
            signOut()
        }
    }
}))
