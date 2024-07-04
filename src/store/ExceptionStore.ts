import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { v4 as uuid } from 'uuid'
import { Schema } from '../../amplify/data/resource'

export interface CreateExceptionInput {
    date: Date
    pickupGuardianId?: string
    dropoffGuardianId?: string
    pickup: Schema['OverrideType']['type']
    dropoff: Schema['OverrideType']['type']
}

type ExceptionType = Schema['Exception']['type']

interface ExceptionStore {
    exceptions: ExceptionType[]
    getExceptions(): Promise<void>
    getExceptionById(exceptionId: string): Promise<ExceptionType>
    createException(exception: CreateExceptionInput, riderId: string): Promise<void>
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
    createException: async (newException: CreateExceptionInput, riderId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = await useOrgStore.getState().getOrgId()

        if (orgId) {
            const exceptionId = uuid()

            const exception: Omit<ExceptionType, 'createdAt' | 'updatedAt'> = {
                id: exceptionId,
                orgId: orgId ?? '',
                riderId: riderId,
                date: newException.date.toDateString(),
                dropoff: newException.dropoff,
                pickup: newException.pickup
            }

            if (newException.pickup === 'override' && newException.pickupGuardianId) {
                const { data: pickupGuardian } = await client.models.User.get({ id: newException.pickupGuardianId })

                if (pickupGuardian) {
                    exception.pickupStopId = pickupGuardian.stopId
                    exception.pickupGuardianId = pickupGuardian.id
                }
            }

            if (newException.dropoff === 'override' && newException.dropoffGuardianId) {
                const { data: dropoffGuardian } = await client.models.User.get({ id: newException.dropoffGuardianId })

                if (dropoffGuardian) {
                    exception.dropoffStopId = dropoffGuardian.stopId
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
