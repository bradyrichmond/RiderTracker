import { array, object, string } from 'yup'

const schoolDaySchema = object({
    dayName: string().required('fieldRequired'),
    startTime: string().required('fieldRequired'),
    endTime: string().required('fieldRequired')
})

export const editSchoolHoursSchema = object({ schoolHours: array().of(schoolDaySchema) })