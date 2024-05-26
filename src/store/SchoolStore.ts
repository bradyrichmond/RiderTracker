import { SchoolType } from '@/types/SchoolType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface SchoolStore {
    schools: SchoolType[]
    getSchools(): Promise<void>
}

export const useSchoolStore = create<SchoolStore>((set) => ({
    schools: [],
    getSchools: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const schools = await api?.schools.getSchools(orgId)
        set({ schools })
    }
}))