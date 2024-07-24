import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { AddressType, CreateAddressTypeInput } from '@/types/AmplifyTypes'

interface AddressStore {
    addresses: AddressType[],
    updateAddresses(): Promise<void>
    createAddress(address: CreateAddressTypeInput): Promise<CreateAddressTypeInput>
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
    createAddress: async (validatedAddress: CreateAddressTypeInput) => {
        const client = await useApiStore.getState().getClient()

        const { data } = await client.models.Address.create(validatedAddress)

        if (data) {
            return data
        }

        throw 'Failed to create address'
    }
}))
