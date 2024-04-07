import { DriverType } from "@/types/DriverType"

const getDrivers = async (_token: string) => Promise.resolve([
    {
        "id": "999",
        "firstName": "Emily",
        "lastName": "Johnson",
        "organizationId": "123"
    },
    {
        "id": "007",
        "firstName": "Jeff",
        "lastName": "Vogl",
        "organizationId": "123"
    },
    {
        "id": "cc210f3a-0efe-466f-aa24-b6b10de92015",
        "firstName": "Dougie",
        "lastName": "Doug",
        "organizationId": "123"
    }
])

const getDriverById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "firstName": "Dougie",
    "lastName": "Doug",
    "organizationId": "123"
})

const getDriversForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
        "id": "999",
        "firstName": "Emily",
        "lastName": "Johnson",
        "organizationId": organizationId
    },
    {
        "id": "007",
        "firstName": "Jeff",
        "lastName": "Vogl",
        "organizationId": organizationId
    },
    {
        "id": "cc210f3a-0efe-466f-aa24-b6b10de92015",
        "firstName": "Dougie",
        "lastName": "Doug",
        "organizationId": organizationId
    }
])

const createDriver = async (_token: string, _body: DriverType) => Promise.resolve({})

const deleteDriver = async (_token: string, _id: string) => Promise.resolve({})

export interface DriverApiFunctionTypes {
    getDrivers(token: string): Promise<DriverType[]>,
    getDriverById(token: string, id: string): Promise<DriverType>,
    getDriversForOrganization(token: string, organizationId: string): Promise<DriverType[]>,
    createDriver(token: string, body: DriverType): Promise<DriverType[]>,
    deleteDriver(token: string, id: string): Promise<DriverType[]>
}

export default {
    getDrivers,
    getDriverById,
    getDriversForOrganization,
    createDriver,
    deleteDriver
}
