import { OverrideType } from '@/types/AmplifyTypes';

export const useExceptionStore = () => ({
    exceptions: [{
        authorized: true,
        date: '2012-03-15',
        dropoff: OverrideType.OVERRIDE,
        dropoffGuardianId: '77463cae-8fcd-48c8-a526-a8997a4e167e',
        dropoffStopId: '0964d0c8-97e5-4408-9de2-42a88eae2093',
        id: 'bde398e8-a41c-4e83-886b-3fa561ba6609',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        pickup: OverrideType.NO_CHANGE,
        riderId: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'
    }],
    getExceptionById: async (exceptionId: string) => ({
        authorized: true,
        date: '2012-03-15',
        dropoff: OverrideType.OVERRIDE,
        dropoffGuardianId: '77463cae-8fcd-48c8-a526-a8997a4e167e',
        dropoffStopId: '0964d0c8-97e5-4408-9de2-42a88eae2093',
        id: exceptionId,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        pickup: OverrideType.NO_CHANGE,
        riderId: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'
    }),
    getExceptions: jest.fn()
})
