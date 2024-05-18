import { RiderType } from "@/types/RiderType"

const getRiderById = async (id: string) => Promise.resolve({
    "id": id,
    "firstName": "Johnny",
    "lastName": "Tester",
    "orgId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
    "guardianRiderLinks": [
        "123456"
    ]
})

const getRiders = async (orgId: string) => Promise.resolve([
    {
        "id": "123456",
        "firstName": "Hallie",
        "lastName": "James",
        "orgId": orgId,
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "70d242f6-6d30-4421-8511-7aad767a8776",
        "firstName": "Ashleigh",
        "lastName": "Ashley",
        "orgId": orgId,
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "123",
        "firstName": "Johnny",
        "lastName": "Tester",
        "orgId": orgId,
        "guardianRiderLinks": [
            "123456"
        ]
    }
])

const getBulkRidersById = async (riderIds: string[]) => {
    const riders: RiderType[] = []

    riderIds.forEach((r) => riders.push({
        "id": r,
        "firstName": "Johnny",
        "lastName": "Tester",
        "orgId": "00492e30-ab34-44f6-9843-44f47f2cdf27"
    }))

    return riders
}

const updateRider = async () => Promise.resolve({})

const createRider = async () => Promise.resolve({})

const deleteRider = async () => Promise.resolve({})

export interface RiderApiFunctionTypes {
    getRiders(orgId: string): Promise<RiderType[]>,
    getRiderById(id: string): Promise<RiderType>,
    getBulkRidersById(ids: string[]): Promise<RiderType[]>,
    updateRider(rider: RiderType): Promise<object>,
    createRider(rider: RiderType): Promise<object>,
    deleteRider(id: string): Promise<object>
}

export default {
    getRiders,
    getRiderById,
    getBulkRidersById,
    updateRider,
    createRider,
    deleteRider
}