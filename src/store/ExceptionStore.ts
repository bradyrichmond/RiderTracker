import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { ExceptionType, ExceptionTypeType } from '@/types/ExceptionType'
import { useUserStore } from './UserStore'
import { useGuardianStore } from './GuardianStore'

export interface CreateExceptionInput {
    date: Date
    pickupGuardianId?: string
    dropoffGuardianId?: string
    pickup: string
    dropoff: string
}

interface ExceptionStore {
    exceptions: ExceptionType[]
    getExceptions(): Promise<void>
    getExceptionById(exceptionId: string): Promise<ExceptionType>
    createException(exception: CreateExceptionInput, type: ExceptionTypeType,  riderId: string): Promise<void>
    deleteException(exceptionId: string): Promise<void>
}

const dateCompare = (a: ExceptionType, b: ExceptionType) => {
    return a.date - b.date
}

export const useExceptionStore = create<ExceptionStore>((set) => ({
    exceptions: [],
    getExceptions: async () => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const initialExceptions: ExceptionType[] = await api?.exceptions.getExceptions(orgId)
        const exceptions = initialExceptions.sort(dateCompare)
        set({ exceptions })
    },
    getExceptionById: async (exceptionId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        const exception = await api?.exceptions.getExceptionById(orgId, exceptionId)

        if (exception) {
            return exception
        }

        throw 'Unable to find exception by id'
    },
    createException: async (newException: CreateExceptionInput, type: ExceptionTypeType, riderId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()
        const userId = useUserStore.getState().userId

        const exceptionId = uuid()

        const exception: ExceptionType = {
            id: exceptionId,
            orgId,
            riderId: riderId,
            date: newException.date.getTime(),
            dropoff: newException.dropoff,
            createdBy: userId,
            createdAt:  new Date().getTime(),
            updatedBy: userId,
            updatedAt:  new Date().getTime(),
            pickup: newException.pickup,
            type
        }

        if (newException.pickup === 'override' && newException.pickupGuardianId) {
            const pickupGuardian = await useGuardianStore.getState().getGuardianById(newException.pickupGuardianId)
            exception.pickupStopId = pickupGuardian.stopId
            exception.pickupGuardianId = pickupGuardian.id
        }

        if (newException.dropoff === 'override' && newException.dropoffGuardianId) {
            const dropoffGuardian = await useGuardianStore.getState().getGuardianById(newException.dropoffGuardianId)
            exception.dropoffStopId = dropoffGuardian.stopId
            exception.dropoffGuardianId = dropoffGuardian.id
        }

        await api?.exceptions.createException(orgId, exception)
    },
    deleteException: async (exceptionId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        await api?.exceptions.deleteException(orgId, exceptionId)
    }
}))
