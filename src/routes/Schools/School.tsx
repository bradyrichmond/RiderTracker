import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolType } from '@/types/SchoolType'
import { Button, Paper, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff'
import EditSchoolDialog from './EditSchoolHoursDialog'

export let dayData = [
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

const School = () => {
    const [isEditingHours, setIsEditingHours] = useState(false)
    const { id: schoolId } = useParams()
    const getSchools = useSchoolStore().getSchools
    const schools = useSchoolStore().schools
    const { t } = useTranslation('schools')

    useEffect(() => {
        getSchools()
    }, [getSchools])

    const school = useMemo(() => {
        const selectedSchool = schools.find((s: SchoolType) => s.id === schoolId)

        if (selectedSchool) {
            return selectedSchool
        }
    }, [schools, schoolId])

    const toggleEditingHours = () => {
        setIsEditingHours((cur) => !cur)
    }

    const updateHours = async (newTimeObject: any) => {
        dayData = newTimeObject
    }

    return (
        <Grid container spacing={2}>
            <EditSchoolDialog open={isEditingHours} cancelAction={toggleEditingHours} updateAction={updateHours} schoolHours={dayData} />
            <Grid xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h2'>{school?.schoolName}</Typography>
                </Paper>
            </Grid>
            <Grid xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>Hours</Typography>
                    <Grid container spacing={2}>
                        {dayData.map((d, i) => <SchoolDayHours
                            key={d.dayName}
                            index={i}
                            dayName={t(d.dayName)}
                            startTime={d.startTime.formatted}
                            endTime={d.endTime.formatted}
                        />)}
                        <Grid xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={toggleEditingHours}
                                sx={{ padding: 4 }}
                            >
                                <Tooltip title={t('editHours')}>
                                    <HistoryToggleOffIcon />
                                </Tooltip>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

interface SchoolDayHoursProps {
    dayName: string
    endTime: string
    index: number
    startTime: string
}

const SchoolDayHours = ({ dayName, endTime, index, startTime }: SchoolDayHoursProps) => {
    const { t } = useTranslation('schools')

    return (
        <Grid xs={12} md={2} mdOffset={index === 0 ? 1 : 0}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>{dayName}</Typography>
                <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{startTime}</Typography>
                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('to')}</Typography>
                <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{endTime}</Typography>
            </Paper>
        </Grid>
    )
}

export default School