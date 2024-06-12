import { array, object, string } from 'yup'

const schoolHoursSchema = object({
    am: string(),
    hour: string().required('fieldRequired'),
    label: string().required('fieldRequired'),
    minute: string().required('fieldRequired')
})

const schoolDaySchema = object({
    dayName: string().required('fieldRequired'),
    startTime: schoolHoursSchema,
    endTime: schoolHoursSchema
})

export const editSchoolHoursSchema = object({ schoolHours: array().of(schoolDaySchema) })


export const dayData = [
    {
        dayName: 'monday',
        startTime: {
            formatted: '09:00 AM',
            hour: 9,
            label: 'startTime',
            minute: 0,
            am: true
        },
        endTime: {
            formatted: '03:30 PM',
            hour: 3,
            label: 'endTime',
            minute: 30,
            am: false
        }
    },
    {
        dayName: 'tuesday',
        startTime: {
            formatted: '09:00 AM',
            hour: 9,
            label: 'startTime',
            minute: 0,
            am: true
        },
        endTime: {
            formatted: '03:30 PM',
            hour: 3,
            label: 'endTime',
            minute: 30,
            am: false
        }
    },
    {
        dayName: 'wednesday',
        startTime: {
            formatted: '09:00 AM',
            hour: 9,
            label: 'startTime',
            minute: 0,
            am: true
        },
        endTime: {
            formatted: '01:40 PM',
            hour: 1,
            label: 'endTime',
            minute: 40,
            am: false
        }
    },
    {
        dayName: 'thursday',
        startTime: {
            formatted: '09:00 AM',
            hour: 9,
            label: 'startTime',
            minute: 0,
            am: true
        },
        endTime: {
            formatted: '03:30 PM',
            hour: 3,
            label: 'endTime',
            minute: 30,
            am: false
        }
    },
    {
        dayName: 'friday',
        startTime: {
            formatted: '09:00 AM',
            hour: 9,
            label: 'startTime',
            minute: 0,
            am: true
        },
        endTime: {
            formatted: '03:30 PM',
            hour: 3,
            label: 'endTime',
            minute: 30,
            am: false
        }
    }
]