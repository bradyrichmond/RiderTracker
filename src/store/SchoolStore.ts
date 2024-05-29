import { SchoolType } from '@/types/SchoolType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { useAddressStore } from './AddressStore'
import { v4 as uuid } from 'uuid'

interface SchoolStore {
    schools: SchoolType[]
    getSchools(): Promise<void>
    getSchoolById(schoolId: string): Promise<SchoolType>
    createSchool(school: SchoolType): Promise<void>
    deleteSchool(schoolId: string): Promise<void>
    addRiderToSchool(school: SchoolType, riderId: string): Promise<void>
    removeRiderFromSchool(school: SchoolType, riderId: string): Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set, get) => ({
    schools: [],
    getSchools: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const schools = await api?.schools.getSchools(orgId)
        set({ schools })
    },
    getSchoolById: async (schoolId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const school = await api?.schools.getSchoolById(orgId, schoolId)

        if (!school) {
            throw 'Could not find school by id'
        }

        return school
    },
    createSchool: async (school: SchoolType) => {
        const orgId = useOrgStore.getState().orgId
        const api = useApiStore.getState().api
        const createAddress = useAddressStore.getState().createAddress

        const address = await createAddress(school.address)
        school.address = address.id

        const newSchoolId = uuid()
        school.id = newSchoolId

        await api?.schools.createSchool(orgId, school)
        await get().getSchools()
    },
    deleteSchool: async (schoolId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        await api?.schools.deleteSchool(orgId, schoolId)
    },
    addRiderToSchool: async (school: SchoolType, riderId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        let riderIds = school.riderIds

        if (!riderIds || riderIds.length < 1) {
            riderIds = []
        }

        riderIds.push(riderId)
        await api?.schools.updateSchool(orgId, school.id, school)
        await get().getSchools()
    },
    removeRiderFromSchool: async (school: SchoolType, riderId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        let riderIds = school.riderIds?.filter((s) => s !== riderId)

        if (!riderIds || riderIds.length < 1) {
            riderIds = ['']
        }

        school.riderIds = riderIds

        await api?.schools.updateSchool(orgId, school.id, school)
    }
}))