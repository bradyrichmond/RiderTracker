import { Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Unstable_Grid2'

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

export default SchoolDayHours
