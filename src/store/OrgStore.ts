import { OrganizationType } from '@/types/OrganizationType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'

export interface OrgStore {
    createOrg(orgName: string): Promise<Schema['Organization']['type']>
    orgId: string
    setOrgId(id: string): void
    orgName: string,
    setOrgName(name: string): void
    updateOrgData(): Promise<void>
    orgs: OrganizationType[]
    setOrganizationArray(orgs: OrganizationType[]): void
    organizationOverride: boolean
    setOrganizationOverride(override: boolean): void
    organizationLoginImageUrl: string
    setOrganizationLoginImageUrl(url: string): void
}

export const useOrgStore = create<OrgStore>((set) => ({
    createOrg: async (orgName: string) => {
        const client = await useApiStore.getState().getClient()
        const { data } = await client.models.Organization.create({ orgName })

        if (data) {
            set({ orgId: data.id })
            return data
        }

        throw 'Failed to create org'
    },
    orgId: '',
    setOrgId: (id: string) => set({ orgId: id }),
    updateOrgData: async () => {
        const client = await useApiStore.getState().getClient()
        client.models.Organization.list()
    },
    orgName: '',
    setOrgName: (name: string) => set({ orgName: name }),
    orgs: [],
    setOrganizationArray: (orgs: OrganizationType[]) => {
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
