import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'

interface AddressStore {
    createAddress(address: string): Promise<string>
}

export const useAddressStore = create<AddressStore>(() => ({
    createAddress: async (address: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const validatedAddress = await api?.addresses.validateAddress(address)

        if (validatedAddress) {
            const newAddressId = uuid()
            validatedAddress.id = newAddressId

            await api?.addresses.createAddress(orgId, validatedAddress)

            return newAddressId
        }

        throw 'Failed to create address'
    }
}))