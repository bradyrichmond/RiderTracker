import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useUserStore } from './UserStore'
import { fetchUserAttributes } from 'aws-amplify/auth'
import { OrganizationType } from '@/types/AmplifyTypes'

export interface OrgStore {
    orgData?: OrganizationType
    createOrg(orgName: string): Promise<OrganizationType>
    getOrgId(): Promise<string>
    updateOrgData(): Promise<void>
}

export const useOrgStore = create<OrgStore>((set) => ({
    orgData: undefined,
    createOrg: async (orgName: string) => {
        await useUserStore.getState().signOutAws()
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.Organization.create({ orgName }, { authMode: 'iam' })

        if (data) {
            return data
        }

        throw 'Failed to create org'
    },
    updateOrgData: async () => {
        const client = await useApiStore.getState().getClient()
        const { data: orgData } = await client.queries.getUserOrg()

        if (orgData) {
            set({ orgData })
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
