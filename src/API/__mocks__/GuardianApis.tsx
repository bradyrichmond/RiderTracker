import { GuardianType } from "@/types/GuardianType"


const getGuardians = async (_token: string) => Promise.resolve([
    {
        "id": "9aaf086f-cbd0-4ff8-8b0d-0ada53db5688",
        "firstName": "Other",
        "lastName": "Parent",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "1b61d67f-d9b8-463f-9ea7-f67f7715bb73",
        "firstName": "Parental",
        "lastName": "Guardian",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    }
])

const getGuardianById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "firstName": "Parental",
    "lastName": "Guardian",
    "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
    "guardianRiderLinks": [
        "123456"
    ]
})

const getGuardiansForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
        "id": "9aaf086f-cbd0-4ff8-8b0d-0ada53db5688",
        "firstName": "Other",
        "lastName": "Parent",
        "organizationId": organizationId,
        "guardianRiderLinks": [
            "123456"
        ]
    },
    {
        "id": "1b61d67f-d9b8-463f-9ea7-f67f7715bb73",
        "firstName": "Parental",
        "lastName": "Guardian",
        "organizationId": organizationId,
        "guardianRiderLinks": [
            "123456"
        ]
    }
])

const getBulkGuardiansById = async (_token: string, guardianIds: string[]) => {
    const guardians: GuardianType[] = []

    guardianIds.forEach((g) => guardians.push({
        "id": g,
        "firstName": "Other",
        "lastName": "Parent",
        "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
        "guardianRiderLinks": [
            "123456"
        ]
    }))

    return guardians
}

const updateGuardian = async (_token: string, _guardian: GuardianType) => Promise.resolve({})

const createGuardian = async (_token: string, _body: GuardianType) => Promise.resolve({})

const deleteGuardian = async (_token: string, _id: string) => Promise.resolve({})

export interface GuardianApiFunctionTypes {
    getGuardians(token: string): Promise<GuardianType[]>,
    getGuardianById(token: string, id: string): Promise<GuardianType>,
    getGuardiansForOrganization(token: string, organizationId: string): Promise<GuardianType[]>,
    getBulkGuardiansById(token: string, ids: string[]): Promise<GuardianType[]>,
    updateGuardian(token: string, guardian: GuardianType): Promise<GuardianType>,
    createGuardian(token: string, guardian: GuardianType): Promise<GuardianType>,
    deleteGuardian(token: string, id: string): Promise<GuardianType>
}

export default {
    getGuardians,
    getGuardianById,
    getGuardiansForOrganization,
    getBulkGuardiansById,
    updateGuardian,
    createGuardian,
    deleteGuardian
}
