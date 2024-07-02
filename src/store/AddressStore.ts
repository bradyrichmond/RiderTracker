import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { Schema } from '../../amplify/data/resource'

interface AddressStore {
    addresses: (Schema['Address']['type'])[],
    updateAddresses(): Promise<void>
    // createAddress(address: string): Promise<Schema['Address']['type']>
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
    // createAddress: async (address: string) => {
    //     TODO: add address check to backend again

    //     const client = await useApiStore.getState().getClient()
    //     const orgId = await useOrgStore.getState().getOrgId()

    //     const validatedAddress = await api?.addresses.validateAddress(address)

    //     if (validatedAddress) {
    //         validatedAddress.orgId = orgId

    //         await client.models.Address.create(validatedAddress)

    //         return validatedAddress
    //     }

    //     throw 'Failed to create address'
    // }
}))
