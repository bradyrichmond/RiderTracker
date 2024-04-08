import { RiderType } from "@/types/RiderType"

const getRiders = async (_token: string) => Promise.resolve([
    {
        "id": "123456",
        "firstName": "Hallie",
        "lastName": "James",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "70d242f6-6d30-4421-8511-7aad767a8776",
        "firstName": "Ashleigh",
        "lastName": "Ashley",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "123",
        "firstName": "Johnny",
        "lastName": "Tester",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    }
])

const getRiderById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "firstName": "Johnny",
    "lastName": "Tester",
    "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
    "guardianRiderLinks": [
        "123456"
    ]
})

const getRidersForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
        "id": "123456",
        "firstName": "Hallie",
        "lastName": "James",
        "organizationId": organizationId,
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "70d242f6-6d30-4421-8511-7aad767a8776",
        "firstName": "Ashleigh",
        "lastName": "Ashley",
        "organizationId": organizationId,
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "123",
        "firstName": "Johnny",
        "lastName": "Tester",
        "organizationId": organizationId,
        "guardianRiderLinks": [
            "123456"
        ]
    }
])

const getBulkRidersById = async (_token: string, riderIds: string[]) => {
    const riders: RiderType[] = []

    riderIds.forEach((r) => riders.push({
        "id": r,
        "firstName": "Johnny",
        "lastName": "Tester",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    }))

    return riders
}

const updateRider = async (_token: string, _rider: RiderType) => Promise.resolve({})

const createRider = async (_token: string, _body: RiderType) => Promise.resolve({})

const deleteRider = async (_token: string, _id: string) => Promise.resolve({})

export interface RiderApiFunctionTypes {
    getRiders(token: string): Promise<RiderType[]>,
    getRiderById(token: string, id: string): Promise<RiderType>,
    getRidersForOrganization(token: string, organizationId: string): Promise<RiderType[]>,
    getBulkRidersById(token: string, ids: string[]): Promise<RiderType[]>,
    updateRider(token: string, rider: RiderType): Promise<RiderType>,
    createRider(token: string, rider: RiderType): Promise<RiderType>,
    deleteRider(token: string, id: string): Promise<RiderType>,
}

export default {
    getRiders,
    getRiderById,
    getRidersForOrganization,
    getBulkRidersById,
    updateRider,
    createRider,
    deleteRider
}