import { AddressType } from "@/types/AddressType"

const getAddresses = async (_token: string) => Promise.resolve([
    {
        "id": "123456",
        "organizationId": "123456",
        "houseNumber": "123",
        "street": "Test Ave",
        "city": "Los Angeles",
        "state": "California",
        "county": "Orange",
        "country": "United States",
        "postcode": "98021",
        "formatted": "123 Test Ave Los Angeles, CA 98021",
        "location": {
            "lat": 42,
            "lon": -121
        }
    }
])

const getSchoolById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "organizationId": "123456",
    "houseNumber": "123",
    "street": "Test Ave",
    "city": "Los Angeles",
    "state": "California",
    "county": "Orange",
    "country": "United States",
    "postcode": "98021",
    "formatted": "123 Test Ave Los Angeles, CA 98021",
    "location": {
        "lat": 42,
        "lon": -121
    }
})

const getAddressesForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
        "id": "123456",
        "organizationId": organizationId,
        "houseNumber": "123",
        "street": "Test Ave",
        "city": "Los Angeles",
        "state": "California",
        "county": "Orange",
        "country": "United States",
        "postcode": "98021",
        "formatted": "123 Test Ave Los Angeles, CA 98021",
        "location": {
            "lat": 42,
            "lon": -121
        }
    }
])

const getBulkAddressesById = async (_token: string, schoolIds: string[]) => {
    const Addresses: AddressType[] = []

    schoolIds.forEach((s) => Addresses.push(
        {
            "id": s,
            "organizationId": "123456",
            "houseNumber": "123",
            "street": "Test Ave",
            "city": "Los Angeles",
            "state": "California",
            "county": "Orange",
            "country": "United States",
            "postcode": "98021",
            "formatted": "123 Test Ave Los Angeles, CA 98021",
            "location": {
                "lat": 42,
                "lon": -121
            }
        })

        
    )

    return Addresses
}

const updateScan = async (_token: string, _school: AddressType) => Promise.resolve({})

const createScan = async (_token: string, _body: AddressType) => Promise.resolve({})

const deleteScan = async (_token: string, _id: string) => Promise.resolve({})

export default {
    getAddresses,
    getSchoolById,
    getAddressesForOrganization,
    getBulkAddressesById,
    updateScan,
    createScan,
    deleteScan
}