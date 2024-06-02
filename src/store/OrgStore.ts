import { OrganizationType } from '@/types/OrganizationType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'

interface StateUpdate {
    orgId?: string
    orgName?: string
    organizationLoginImageUrl?: string
}

export interface OrgStore {
    orgId: string
    setOrgId(id: string): void
    orgName: string,
    setOrgName(name: string): void
    updateOrgData(): Promise<void>
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
    updateOrgData: async () => {
        const api = await useApiStore.getState().getApi()
        const stateUpdate: StateUpdate = {}
        const path = window.location.toString().split('//')[1]
        const pathOrgSlug = path.split('.')[0]
        const orgSlugResponse = await api?.organizations.getOrganizationLoginDataBySlug(pathOrgSlug)
        const { orgName: fetchedOrgName, loginImageKey, id } = orgSlugResponse

        stateUpdate.orgId = id
        stateUpdate.orgName = fetchedOrgName

        if (loginImageKey) {
            stateUpdate.organizationLoginImageUrl = `https://s3.us-west-2.amazonaws.com/${loginImageKey}`
        }

        set(stateUpdate)
    },
    orgName: '',
    setOrgName: (name: string) => set({ orgName: name }),
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
