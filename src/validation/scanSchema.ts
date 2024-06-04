import { LocationType } from '@/types/LocationType'
import { ScanType } from '@/types/ScanType'
import { ObjectSchema, array, boolean, mixed, number, object, string } from 'yup'

export const scanSchema: ObjectSchema<ScanType> = object({
    createdAt: number().required(),
    deviceLocationOnSubmit: mixed<LocationType>().required(),
    driverId: string().required(),
    guardianIds: array(),
    id: string().uuid().required(),
    manualScan: boolean(),
    orgId: string().uuid().required(),
    stopId: string().required('fieldRequired'),
    riderIds: array().required('fieldRequired'),
    routeNumber: string().required('fieldRequired')
})