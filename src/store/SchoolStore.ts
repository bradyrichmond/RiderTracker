import { CreateSchoolTypeInput, SchoolHourType, SchoolType, UpdateSchoolTypeInput } from '@/types/AmplifyTypes'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useUserStore } from './UserStore'
import { useAddressStore } from './AddressStore'
import { useOrgStore } from './OrgStore'

export interface SchoolRider {
    firstName: string
    id: string
    lastName: string
}

export interface SelectionSetSchool {
    address: {
        formatted: string
    }
    id: string
    orgId: string
    riders: SchoolRider[]
    schoolName: string
}

interface SchoolStore {
    createSchool(school: CreateSchoolTypeInput, address: string): Promise<void>
    deleteSchool(schoolId: string): Promise<void>
    getSchoolById(schoolId: string): Promise<SchoolType>
    schools: SelectionSetSchool[]
    updateSchoolHours(schoolId: string, hours: SchoolHourType[]): Promise<void>
    updateSchool(school: UpdateSchoolTypeInput): Promise<void>
    updateSchools(): Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set) => ({
    createSchool: async (school: CreateSchoolTypeInput, address: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        if (!orgId) {
            throw 'Could not find user orgId'
        }

        const { data: validateAddressResponse } = await client.mutations.validateAddress({ address })

        if (!validateAddressResponse) {
            throw 'Invalid address'
        }

        const { schoolName } = school
        const { data: createSchoolResponse } = await client.models.School.create({ schoolName, orgId })

        if (!createSchoolResponse) {
            throw 'failed to create school'
        }

        const schoolId = createSchoolResponse.id

        try {
            await useAddressStore.getState().createAddress({ ...validateAddressResponse, orgId, schoolId })
        } catch {
            throw 'Failed to create address after creating school'
        }
    },
    deleteSchool: async (schoolId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.School.delete({ id: schoolId })
    },
    getSchoolById: async (schoolId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: school } = await client.models.School.get({ id: schoolId })

        if (!school) {
            throw 'Could not find school by id'
        }

        return school
    },
    schools: [],
    updateSchools: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = useUserStore.getState().currentUser?.orgId

        if (!orgId) {
            throw 'No org id for user'
        }

        const { data: schools } = await client.models.School.listSchoolByOrgId({ orgId }, {
            selectionSet: [
                'address.formatted',
                'id',
                'orgId',
                'riders.firstName',
                'riders.id',
                'riders.lastName',
                'schoolName'
            ]
        })

        set({ schools })
    },
    updateSchool: async (newSchoolData: UpdateSchoolTypeInput) => {
        const client = await useApiStore.getState().getClient()
        try {
            await client.models.School.update(newSchoolData)
        } catch {
            throw 'Failed to update school'
        }
    },
    updateSchoolHours: async () => {
        throw 'You broke school hours'
    }
}))