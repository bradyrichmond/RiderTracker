// @ts-ignore
import { BusApis } from "@/API/BusApis"
import { BusType } from "@/types/BusType"

const getBuses = async (_token: string) => Promise.resolve([
    {
        "id": "b19d7f92-c969-457a-84e0-bf64e986ed6a",
        "busNumber": "267",
        "organizationId": "123"
    },
    {
        "id": "7888888888",
        "busNumber": "12",
        "organizationId": "123"
    },
    {
        "id": "{12-341-222-12-22}",
        "busNumber": "3",
        "organizationId": "123"
    },
    {
        "id": "424-787-111",
        "busNumber": "469",
        "organizationId": "123"
    },
    {
        "id": "e8b3ff46-0024-437e-9e75-f0e319a92cea",
        "busNumber": "69",
        "organizationId": "123"
    },
    {
        "id": "9a381019-c1db-41a0-93c8-c9994f96edb4",
        "busNumber": "420",
        "organizationId": "123"
    }
])

const getBusById = async (_token: string, busId: string) => Promise.resolve({
    "id": busId,
    "busNumber": "420",
    "organizationId": "123"
})

const getBusesForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
        "id": "b19d7f92-c969-457a-84e0-bf64e986ed6a",
        "busNumber": "267",
        "organizationId": organizationId
    },
    {
        "id": "7888888888",
        "busNumber": "12",
        "organizationId": organizationId
    },
    {
        "id": "{12-341-222-12-22}",
        "busNumber": "3",
        "organizationId": organizationId
    },
    {
        "id": "424-787-111",
        "busNumber": "469",
        "organizationId": organizationId
    },
    {
        "id": "e8b3ff46-0024-437e-9e75-f0e319a92cea",
        "busNumber": "69",
        "organizationId": organizationId
    },
    {
        "id": "9a381019-c1db-41a0-93c8-c9994f96edb4",
        "busNumber": "420",
        "organizationId": organizationId
    }
])

const createBus = async (_token: string, _body: BusType) => Promise.resolve({})

const deleteBus = async (_token: string, _id: string) => Promise.resolve({})

export interface BusApiFunctionTypes {
    getBuses(token: string): Promise<BusType[]>,
    getBusById(token: string, id: string): Promise<BusType>,
    getBusesForOrganization(token: string, organizationId: string): Promise<BusType[]>,
    createBus(token: string, body: BusType): Promise<BusType>,
    deleteBus(token: string, id: string): Promise<BusType>,
}

export default {
    getBuses,
    getBusById,
    getBusesForOrganization,
    createBus,
    deleteBus
}

