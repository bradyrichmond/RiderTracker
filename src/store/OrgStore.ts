import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'
import { useUserStore } from './UserStore'
import { fetchUserAttributes } from 'aws-amplify/auth'
import { Subscription } from 'rxjs'

export interface OrgStore {
    orgData?: Schema['Organization']['type']
    createOrg(orgName: string): Promise<Schema['Organization']['type']>
    getOrgId(): Promise<string>
    startOrgSubscription(): Promise<void>
    stopOrgSubscription(): Promise<void>
    subscription?: Subscription
}

export const useOrgStore = create<OrgStore>((set, get) => ({
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
    getOrgId: async () => {
        const attributes = await fetchUserAttributes()
        const orgId = attributes['custom:orgId']

        if (orgId) {
            return orgId
        }

        throw 'Unable to get org id'
    },
    startOrgSubscription: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await get().getOrgId()

        if (orgId) {
            const subscription = client.models.Organization.observeQuery({ filter: { id: { eq: orgId } } }).subscribe({
                next: ({ items }) => {
                    console.log('Organization update')
                    set({ orgData: items[0] })
                },
                error: () => {
                    console.error('Subscription problem')
                }
            })
            set({ subscription })
        }
    },
    stopOrgSubscription: async () => {
        const subscription = get().subscription

        if (subscription) {
            subscription.unsubscribe()
        }
    }
}))
