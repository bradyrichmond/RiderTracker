import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { ExceptionType } from '@/types/ExceptionType'
import { useUserStore } from './UserStore'

interface ExceptionStore {
    exceptions: ExceptionType[]
    getExceptions(): Promise<void>
    getExceptionById(exceptionId: string): Promise<ExceptionType>
    createException(exception: ExceptionType): Promise<void>
    deleteException(exceptionId: string): Promise<void>
}

export const useExceptionStore = create<ExceptionStore>((set) => ({
    exceptions: [],
    getExceptions: async () => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const exceptions = await api?.exceptions.getExceptions(orgId)
        set({ exceptions })
    },
    getExceptionById: async (exceptionId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        const exception = await api?.exceptions.getExceptionById(orgId, exceptionId)

        if (exception) {
            return exception
        }

        throw 'Unable to find exception by id'
    },
    createException: async (newException: Pick<ExceptionType, 'riderId' | 'pickupStopId' | 'guardianId' | 'dropOffStopId' | 'date'>) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId
        const userId = useUserStore.getState().userId

        const exceptionId = uuid()

        const exception: ExceptionType = {
            id: exceptionId,
            orgId,
            riderId: newException.riderId,
            date: newException.date,
            pickupStopId: newException.pickupStopId,
            guardianId: newException.guardianId,
            dropOffStopId: newException.dropOffStopId,
            createdBy: userId,
            createdDate:  new Date(),
            lastEditedBy: userId,
            lastEditDate:  new Date()
        }

        await api?.exceptions.createException(orgId, exception)
    },
    deleteException: async (exceptionId: string) => {
        const api = await useApiStore.getState().getApi()
        const orgId = useOrgStore.getState().orgId

        await api?.exceptions.deleteException(orgId, exceptionId)
    }
}))
