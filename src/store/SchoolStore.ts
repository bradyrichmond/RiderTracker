import { SchoolHourType } from '@/types/AmplifyTypes'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { Schema } from '../../amplify/data/resource'

type SchoolType = Schema['School']['type']

interface SchoolStore {
    createSchool(school: Schema['School']['createType']): Promise<void>
    deleteSchool(schoolId: string): Promise<void>
    getSchools(): Promise<void>
    getSchoolById(schoolId: string): Promise<SchoolType>
    schools: SchoolType[]
    updateSchoolHours(schoolId: string, hours: SchoolHourType[]): Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set, get) => ({
    createSchool: async (school: Schema['School']['createType']) => {
        const client = await useApiStore.getState().getClient()

        await client.models.School.create(school)
        await get().getSchools()
    },
    deleteSchool: async (schoolId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.School.delete({ id: schoolId })
    },
    getSchools: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: schools } = await client.models.School.list()
        set({ schools })
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
    updateSchoolHours: async () => {
        throw 'You broke school hours'
    }
}))