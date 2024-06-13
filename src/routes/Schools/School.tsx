import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolHourType, SchoolType } from '@/types/SchoolType'
import { Button, Paper, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff'
import EditSchoolDialog from './EditSchoolHoursDialog'
import dayjs from 'dayjs'

interface SchoolProps {
    activeSchool?: string
}

const School = ({ activeSchool }: SchoolProps) => {
    const [isEditingHours, setIsEditingHours] = useState(false)
    const getSchools = useSchoolStore().getSchools
    const schools = useSchoolStore().schools
    const updateSchoolHours = useSchoolStore().updateSchoolHours
    const { t } = useTranslation('schools')

    useEffect(() => {
        getSchools()
    }, [getSchools])

    const school = useMemo(() => {
        const selectedSchool = schools.find((s: SchoolType) => s.id === activeSchool)

        if (selectedSchool) {
            return selectedSchool
        }
    }, [schools, activeSchool])

    const toggleEditingHours = () => {
        setIsEditingHours((cur) => !cur)
    }

    const updateHours = async (newTimeObject: SchoolHourType[]) => {
        if (activeSchool) {
            await updateSchoolHours(activeSchool, newTimeObject)
            await getSchools()
        }
    }

    return (
        <Grid container spacing={2}>
            <EditSchoolDialog open={isEditingHours} cancelAction={toggleEditingHours} updateAction={updateHours} />
            <Grid xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h2'>{school?.schoolName}</Typography>
                </Paper>
            </Grid>
            <Grid xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>Hours</Typography>
                    <Grid container spacing={2}>
                        {school?.hours.map((d, i) => <SchoolDayHours
                            key={d.dayName}
                            index={i}
                            dayName={t(d.dayName)}
                            startTime={d.startTime}
                            endTime={d.endTime}
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

    const formattedStartTime = useMemo(() => {
        return dayjs(Number(startTime)).format('hh:mm A')
    }, [startTime])

    const formattedEndTime = useMemo(() => {
        return dayjs(Number(endTime)).format('hh:mm A')
    }, [endTime])

    return (
        <Grid xs={12} md={2} mdOffset={index === 0 ? 1 : 0}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>{dayName}</Typography>
                <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{formattedStartTime}</Typography>
                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('to')}</Typography>
                <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{formattedEndTime}</Typography>
            </Paper>
        </Grid>
    )
}

export default School