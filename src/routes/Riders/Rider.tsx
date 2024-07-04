import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useRiderStore } from '@/store/RiderStore'
import Grid from '@mui/material/Unstable_Grid2'
import { useStopStore } from '@/store/StopStore'
import { useTranslation } from 'react-i18next'
import { useGuardianStore } from '@/store/GuardianStore'
import { useExceptionStore } from '@/store/ExceptionStore'
import RiderSpeedDial from './RiderSpeedDial'
import Exception from './Exception'
import { Schema } from '../../../amplify/data/resource'

interface RiderProps {
    activeRider?: string
}

type ExceptionType = Schema['Exception']['type']

const Rider = ({ activeRider: riderId }: RiderProps) => {
    const riders = useRiderStore().riders
    const getRiders = useRiderStore().getRiders
    const getStops = useStopStore().getStops
    const getGuardians = useGuardianStore().getGuardians
    const exceptions = useExceptionStore().exceptions
    const getExceptions = useExceptionStore().getExceptions
    const { t } = useTranslation('riders')

    useEffect(() => {
        getRiders()
        getStops()
        getGuardians()
        getExceptions()
    }, [getRiders, getStops, getGuardians, getExceptions])

    const rider = useMemo(() => {
        return riders.find((r: Schema['Rider']['type']) => r.id === riderId)
    }, [riders, riderId])

    const authorizedRiderExceptions = useMemo(() => {
        return exceptions.filter((e: ExceptionType) => e.riderId === riderId)
    }, [exceptions, riderId])

    return (
        <Box sx={{ height: '100%' }}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Grid container spacing={2} sx={{ height: '100%' }}>
                            <Grid xs={11}>
                                <Typography variant='h2'>{rider?.firstName} {rider?.lastName}</Typography>
                            </Grid>
                            <Grid xs={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <RiderSpeedDial />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper sx={{ height: '100%'  }}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('authorizedExceptions')}</Typography>
                            {authorizedRiderExceptions.length > 0 ? authorizedRiderExceptions.map((e: ExceptionType) => <Exception key={e.id} exceptionId={e.id ?? ''} />) : t('noExceptionsAssigned')}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Rider