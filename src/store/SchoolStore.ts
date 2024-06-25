import { SchoolHourType, SchoolType } from '@/types/SchoolType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { useAddressStore } from './AddressStore'
import { v4 as uuid } from 'uuid'
import { useUserStore } from './UserStore'

interface SchoolStore {
    createSchool(school: SchoolType, address: string): Promise<void>
    deleteSchool(schoolId: string): Promise<void>
    getSchools(): Promise<void>
    getSchoolById(schoolId: string): Promise<SchoolType>
    schools: SchoolType[]
    updateSchoolHours(schoolId: string, hours: SchoolHourType[]): Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set, get) => ({
    createSchool: async (school: SchoolType, address: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()
        const createAddress = useAddressStore.getState().createAddress

        const addressResponse = await createAddress(address)
        school.addressId = addressResponse.id

        const newSchoolId = uuid()
        school.id = newSchoolId

        await api?.schools.createSchool(orgId, school)
        await get().getSchools()
    },
    deleteSchool: async (schoolId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.schools.deleteSchool(orgId, schoolId)
    },
    getSchools: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const schools = await api?.schools.getSchools(orgId)
        set({ schools })
    },
    getSchoolById: async (schoolId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const school = await api?.schools.getSchoolById(orgId, schoolId)

        if (!school) {
            throw 'Could not find school by id'
        }

        return school
    },
    schools: [],
    updateSchoolHours: async (schoolId: string, hours: SchoolHourType[]) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = useUserStore.getState().userId

        const school = await get().getSchoolById(schoolId)

        if (school) {
            school.hours = hours
            school.updatedBy = userId
            school.updatedAt = new Date().getTime()

            await api?.schools.updateSchool(orgId, school.id, school)
        }
    }
}))