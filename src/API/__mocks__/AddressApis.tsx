import { AddressType } from '@/types/AddressType'

const getSchoolById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    houseNumber: '123',
    street: 'Test Ave',
    city: 'Los Angeles',
    state: 'California',
    county: 'Orange',
    country: 'United States',
    postcode: '98021',
    formatted: '123 Test Ave Los Angeles, CA 98021',
    location: {
        lat: 42,
        lon: -121
    }
})

const getAddresses = async (orgId: string) => Promise.resolve([
    {
        id: '123456',
        orgId: orgId,
        houseNumber: '123',
        street: 'Test Ave',
        city: 'Los Angeles',
        state: 'California',
        county: 'Orange',
        country: 'United States',
        postcode: '98021',
        formatted: '123 Test Ave Los Angeles, CA 98021',
        location: {
            lat: 42,
            lon: -121
        }
    }
])

const getBulkAddressesById = async (schoolIds: string[]) => {
    const Addresses: AddressType[] = []

    schoolIds.forEach((s) => Addresses.push(
        {
            id: s,
            orgId: '123456',
            houseNumber: '123',
            streetName: 'Test Ave',
            city: 'Los Angeles',
            state: 'California',
            county: 'Orange',
            country: 'United States',
            postcode: '98021',
            formatted: '123 Test Ave Los Angeles, CA 98021',
            location: {
                lat: 42,
                lon: -121
            }
        })


    )

    return Addresses
}

const updateAddress = async () => Promise.resolve({})

const createAddress = async () => Promise.resolve({})

const deleteAddress = async () => Promise.resolve({})

export interface AddressApiFunctionTypes {
    getAddresss(orgId: string): Promise<AddressType[]>,
    getAddressById(id: string): Promise<AddressType>,
    getBulkAddressesById(ids: string[]): Promise<AddressType[]>,
    updateAddress(scan: AddressType): Promise<object>,
    createAddress(scan: AddressType): Promise<object>,
    deleteAddress(id: string): Promise<object>
}

export default {
    getAddresses,
    getSchoolById,
    getBulkAddressesById,
    updateAddress,
    createAddress,
    deleteAddress
}