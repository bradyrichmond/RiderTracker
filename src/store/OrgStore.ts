import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { fetchUserAttributes, signUp } from 'aws-amplify/auth'
import { OrganizationType } from '@/types/AmplifyTypes'

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
    createOrg(orgName: string, admin: CreateFirstAdminArgs): Promise<{ userId: string, orgId: string }>
    getOrgId(): Promise<string>
    updateOrgData(): Promise<void>
}

export const useOrgStore = create<OrgStore>((set, get) => ({
    orgData: undefined,
    createOrg: async (orgName: string, admin: CreateFirstAdminArgs) => {
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.Organization.create({ orgName })
        const orgId = data?.id

        if (orgId) {
            admin.options.userAttributes['custom:orgId'] = orgId
            const { userId } = await signUp(admin)

            if (userId) {
                return { userId, orgId }
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
    getOrgId: async () => {
        const attributes = await fetchUserAttributes()
        const orgId = attributes['custom:orgId']

        if (orgId) {
            return orgId
        }

        throw 'Unable to get org id'
    }
}))
