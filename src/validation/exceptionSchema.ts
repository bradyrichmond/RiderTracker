import { boolean, date, object, string } from 'yup'

export const exceptionSchema = object({
    date: date().required('fieldRequired'),
    guardianId: string().required('fieldRequired'),
    pickup: boolean(),
    dropoff: boolean()
})