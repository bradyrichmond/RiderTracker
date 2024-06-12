import { date, object, string } from 'yup'

export const exceptionSchema = object({
    date: date().required('fieldRequired'),
    pickupGuardianId: string().when('pickup', {
        is: 'override',
        then: (schema) => schema.required()
    }),
    dropoffGuardianId: string().when('dropoff', {
        is: 'override',
        then: (schema) => schema.required()
    }),
    pickup: string().required(),
    dropoff: string().required()
})