import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { Schema } from '../../amplify/data/resource'

interface AddressStore {
    addresses: (Schema['Address']['type'])[],
    updateAddresses(): Promise<void>
    createAddress(address: string): Promise<Schema['Address']['type']>
}

export const useAddressStore = create<AddressStore>((set) => ({
    addresses: [],
    updateAddresses: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const { data: addresses } = await client.models.Address.listAddressByOrgId({ orgId: orgId })

        if (addresses) {
            set({ addresses })
        }
    },
    createAddress: async (address: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const { data: validatedAddress } = await client.mutations.validateAddress({ address })

        if (validatedAddress) {
            const newAddress = {
                ...validatedAddress,
                orgId
            }

            const { data } = await client.models.Address.create(newAddress)

            if (data) {
                return data
            }
        }

        throw 'Failed to create address'
    }
}))
