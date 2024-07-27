import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { confirmSignUp, ConfirmSignUpOutput, fetchUserAttributes, signIn, SignInOutput, signUp, SignUpOutput } from 'aws-amplify/auth'
import { CreateUserTypeInput, OrganizationType } from '@/types/AmplifyTypes'

interface CreateFirstAdminArgs {
    username: string
    password: string
    options: {
        userAttributes: {
            given_name: string
            family_name: string
            email: string
            'custom:orgId'?: string
        }
        autoSignIn: boolean
    }
}

export interface OrgStore {
    orgData?: OrganizationType
    createFirstAdmin(admin: CreateFirstAdminArgs): Promise<string>
    createOrg(orgId: string, orgName: string, username: string, confirmationCode: string, userPassword: string, user: CreateUserTypeInput): Promise<string>
    getOrgId(): Promise<string>
    updateOrgData(): Promise<void>
    updateOrgData(): Promise<void>
}

export const useOrgStore = create<OrgStore>((set, get) => ({
    orgData: undefined,
    createFirstAdmin: async (admin: CreateFirstAdminArgs) => {
        const { userId }: SignUpOutput = await signUp(admin)

        if (userId) {
            return userId
        }

        throw 'Failed to create user'
    },
    createOrg: async (orgId: string, orgName: string, username: string, confirmationCode: string, password: string, user: CreateUserTypeInput) => {
        const { isSignUpComplete }: ConfirmSignUpOutput = await confirmSignUp({ username, confirmationCode })

        if (isSignUpComplete) {
            const { isSignedIn }: SignInOutput = await signIn({ username, password })

            if (isSignedIn) {
                const client = await useApiStore.getState().getClient()
                await client.models.Organization.create({ id: orgId, orgName })
                const { data: userData } = await client.models.User.create({ ...user, isAdmin: true })
                const userId = userData?.id

                if (!userId) {
                    throw 'failed to create admin in database'
                }

                return orgId
            }
        }


        throw 'Failed to create org'
    },
    updateOrgData: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await get().getOrgId()

        if (orgId) {
            const { data: orgData } = await client.models.Organization.get({ id: orgId })

            if (orgData) {
                set({ orgData })
            }
        }
    },
    updateOrgData: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await get().getOrgId()

        if (orgId) {
            const { data: orgData } = await client.models.Organization.get({ id: orgId })

            if (orgData) {
                set({ orgData })
            }
        }
    },
    getOrgId: async () => {
        const attributes = await fetchUserAttributes()
        const orgId = attributes['custom:orgId']

        if (orgId) {
            return orgId
        }

        throw 'Unable to get org id'
    }
}))
