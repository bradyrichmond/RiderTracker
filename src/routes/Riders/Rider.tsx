import { Box, Divider, Paper, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { RiderType } from '@/types/RiderType'
import { useRiderStore } from '@/store/RiderStore'
import Grid from '@mui/material/Unstable_Grid2'
import { useStopStore } from '@/store/StopStore'
import { StopType } from '@/types/StopType'
import { useTranslation } from 'react-i18next'
import { useGuardianStore } from '@/store/GuardianStore'
import { GuardianType } from '@/types/UserType'
import { useExceptionStore } from '@/store/ExceptionStore'
import { ExceptionType } from '@/types/ExceptionType'

interface RiderProps {
    activeRider?: string
}

const Rider = ({ activeRider: riderId }: RiderProps) => {
    const riders = useRiderStore().riders
    const getRiders = useRiderStore().getRiders
    const stops = useStopStore().stops
    const getStops = useStopStore().getStops
    const guardians = useGuardianStore().guardians
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
        return riders.find((r: RiderType) => r.id === riderId)
    }, [riders, riderId])

    const riderStops = useMemo(() => {
        return stops.filter((s: StopType) => rider?.stopIds.includes(s.id))
    }, [stops, rider])

    const riderGuardians = useMemo(() => {
        return guardians.filter((g: GuardianType) => rider?.guardianIds?.includes(g.id))
    }, [guardians, rider])

    const riderExceptions = useMemo(() => {
        return exceptions.filter((e: ExceptionType) => e.riderId === riderId)
    }, [exceptions, riderId])

    return (
        <Box sx={{ height: '100%' }}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Paper sx={{ padding: '1rem' }}>
                        <Typography variant='h2'>{rider?.firstName} {rider?.lastName}</Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} md={6}>
                    <Paper sx={{ height: '100%' }}>
                        <Box sx={{ padding: '1rem' }}>
                            <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{riderStops.length === 1 ? t('stop') : t('stops')}</Typography>
                            <Divider sx={{ mt: '1rem', mb: '1rem' }} />
                            {riderStops.length > 0 ? riderStops.map((s: StopType) => <Typography key={s.id}>{s.stopName}</Typography>) : t('noStopsAssigned')}
                        </Box>
                    </Paper>
                </Grid>
                <Grid xs={12} md={6}>
                    <Paper sx={{ height: '100%' }}>
                        <Box sx={{ padding: '1rem' }}>
                            <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{riderGuardians.length === 1 ? t('guardian') : t('guardians')}</Typography>
                            <Divider sx={{ mt: '1rem', mb: '1rem' }} />
                            {riderGuardians.length > 0 ? riderGuardians.map((g: GuardianType) => <Typography key={g.id}>{`${g.firstName} ${g.lastName}`}</Typography>) : t('noGuardiansAssigned')}
                        </Box>
                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Paper sx={{ padding: '1rem', height: '100%'  }}>
                        <Box sx={{ padding: '1rem' }}>
                            <Typography variant='h3' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{t('exceptions')}</Typography>
                            <Divider sx={{ mt: '1rem', mb: '1rem' }} />
                            {riderExceptions.length > 0 ? riderExceptions.map((e: ExceptionType) => <Typography key={e.id}>{e.id}</Typography>) : t('noExceptionsAssigned')}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Rider