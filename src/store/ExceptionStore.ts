import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { CreateExceptionTypeInput, ExceptionType, OverrideType } from '@/types/AmplifyTypes'

interface ExceptionStore {
    exceptions: ExceptionType[]
    getExceptions(): Promise<void>
    getExceptionById(exceptionId: string): Promise<ExceptionType>
    createException(exception: CreateExceptionTypeInput, riderId: string): Promise<void>
    deleteException(exceptionId: string): Promise<void>
}

export const useExceptionStore = create<ExceptionStore>((set) => ({
    exceptions: [],
    getExceptions: async () => {
        const client = await useApiStore.getState().getClient()

        const { data: exceptions } = await client.models.Exception.list()

        if (exceptions) {
            set({ exceptions })
        }
    },
    getExceptionById: async (exceptionId: string) => {
        const client = await useApiStore.getState().getClient()

        const { data: exception } = await client.models.Exception.get({ id: exceptionId })

        if (exception) {
            return exception
        }

        throw 'Unable to find exception by id'
    },
    createException: async (newException: CreateExceptionTypeInput, riderId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        if (orgId) {
            const exceptionId = uuid()

            const exception: Omit<ExceptionType, 'createdAt' | 'updatedAt'> = {
                id: exceptionId,
                orgId: orgId ?? '',
                riderId: riderId,
                date: newException.date,
                dropoff: newException.dropoff,
                pickup: newException.pickup
            }

            if (newException.pickup === OverrideType.OVERRIDE && newException.pickupGuardianId) {
                const { data: pickupGuardian } = await client.models.User.get({ id: newException.pickupGuardianId })

                if (pickupGuardian) {
                    exception.pickupGuardianId = pickupGuardian.id
                }
            }

            if (newException.dropoff === OverrideType.OVERRIDE && newException.dropoffGuardianId) {
                const { data: dropoffGuardian } = await client.models.User.get({ id: newException.dropoffGuardianId })

                if (dropoffGuardian) {
                    exception.dropoffGuardianId = dropoffGuardian.id
                }
            }

            await client.models.Exception.create(exception)
        }

        throw 'missing org id'
    },
    deleteException: async (exceptionId: string) => {
        const client = await useApiStore.getState().getClient()

        await client.models.Exception.delete({ id: exceptionId })
    }
}))
