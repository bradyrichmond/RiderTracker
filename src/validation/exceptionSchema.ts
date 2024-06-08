import { boolean, date, object, string } from 'yup'

export const exceptionSchema = object({
    date: date().required('fieldRequired'),
    pickupGuardianId: string(),
    dropoffGuardianId: string(),
    pickup: boolean(),
    dropoff: boolean()
})