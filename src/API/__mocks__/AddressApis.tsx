import { AddressType } from '@/types/AddressType'

// import SoundPlayer from './sound-player';
// const fakePlaySoundFile = jest.fn();
// jest.mock('./sound-player', () => {
//   return jest.fn().mockImplementation(() => {
//     return {playSoundFile: fakePlaySoundFile};
//   });
// });

const mockGetAddressById = async (id: string) => Promise.resolve({
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

const mockGetAddresses = async (orgId: string) => Promise.resolve([
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

const mockGetBulkAddressesById = async (schoolIds: string[]) => {
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

const mockUpdateAddress = async () => Promise.resolve({})

const mockCreateAddress = async () => Promise.resolve({})

const mockDeleteAddress = async () => Promise.resolve({})

export const AddressApis = jest.fn().mockImplementation(() => ({
    getAddresses: mockGetAddresses,
    getAddressById: mockGetAddressById,
    getBulkAddressesById: mockGetBulkAddressesById,
    updateAddress: mockUpdateAddress,
    createAddress: mockCreateAddress,
    deleteAddress: mockDeleteAddress,
}))
