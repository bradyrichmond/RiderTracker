import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { AddressType } from '@/types/AddressType'

interface AddressStore {
    addresses: AddressType[],
    updateAddresses(): Promise<void>
    createAddress(address: string): Promise<AddressType>
    getBulkAddressesById(addressIds: string[]): Promise<AddressType[]>
}

export const useAddressStore = create<AddressStore>((set) => ({
    addresses: [],
    updateAddresses: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const addresses = await api?.addresses.getAddresses(orgId)
        set({ addresses })
    },
    createAddress: async (address: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const validatedAddress = await api?.addresses.validateAddress(address)

        if (validatedAddress) {
            const newAddressId = uuid()
            validatedAddress.id = newAddressId
            validatedAddress.orgId = orgId

            await api?.addresses.createAddress(orgId, validatedAddress)

            return validatedAddress
        }

        throw 'Failed to create address'
    },
    getBulkAddressesById: async (addressIds: string[]) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const addresses = api?.addresses.getBulkAddressesByIds(orgId, addressIds)
        if (addresses) {
            return addresses
        }

        throw 'Could not get addresses by id'
    }
}))
