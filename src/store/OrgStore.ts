import { OrganizationType } from '@/types/OrganizationType'
import { create } from 'zustand'

export interface OrgStore {
    orgId: string
    setOrgId(id: string): void
    organizationArray: OrganizationType[]
    setOrganizationArray(orgs: OrganizationType[]): void
    organizationOverride: boolean
    setOrganizationOverride(override: boolean): void
    organizationLoginImageUrl: string
    setOrganizationLoginImageUrl(url: string): void
}

export const useOrgStore = create<OrgStore>((set) => ({
    orgId: '',
    setOrgId: (id: string) => set({ orgId: id }),
    organizationArray: [],
    setOrganizationArray: (orgs: OrganizationType[]) => {
        set({ organizationArray: orgs })
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
