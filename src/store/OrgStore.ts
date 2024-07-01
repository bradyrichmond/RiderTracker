import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'
import { useUserStore } from './UserStore'

export interface OrgStore {
    orgData?: Schema['Organization']['type']
    createOrg(orgName: string): Promise<Schema['Organization']['type']>
    orgId: string
    setOrgId(id: string): void
    orgName: string,
    setOrgName(name: string): void
    updateOrgData(): Promise<void>
    orgs: Schema['Organization']['type'][]
    setOrganizationArray(orgs: Schema['Organization']['type'][]): void
    organizationOverride: boolean
    setOrganizationOverride(override: boolean): void
    organizationLoginImageUrl: string
    setOrganizationLoginImageUrl(url: string): void
}

export const useOrgStore = create<OrgStore>((set) => ({
    createOrg: async (orgName: string) => {
        await useUserStore.getState().signOutAws()
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.Organization.create({ orgName }, { authMode: 'iam' })

        if (data) {
            set({ orgId: data.id })
            return data
        }

        throw 'Failed to create org'
    },
    orgId: '',
    setOrgId: (id: string) => set({ orgId: id }),
    updateOrgData: async () => {
        const user = useUserStore.getState().currentUser

        if (user) {
            const client = await useApiStore.getState().getClient()
            const { data: orgData } = await client.models.Organization.get({ id: user.orgId }, { authMode: 'userPool' })

            if (orgData) {
                set({ orgData })
            }
        }
    },
    orgName: '',
    setOrgName: (name: string) => set({ orgName: name }),
    orgs: [],
    setOrganizationArray: (orgs: Schema['Organization']['type'][]) => {
        set({ orgs })
    },
    organizationOverride: false,
    setOrganizationOverride: (override: boolean) => {
        set({ organizationOverride: override })
    },
    organizationLoginImageUrl: '',
    setOrganizationLoginImageUrl: (url: string) => {
        set({ organizationLoginImageUrl: url })
    }
}))
