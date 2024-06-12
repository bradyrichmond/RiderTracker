import { useExceptionStore } from '@/store/ExceptionStore'
import { useGuardianStore } from '@/store/GuardianStore'
import { useStopStore } from '@/store/StopStore'
import { StopType } from '@/types/StopType'
import { GuardianType } from '@/types/UserType'
import { Box, Divider, Skeleton, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface ExceptionProps {
    exceptionId: string
}

const Exception = ({ exceptionId }: ExceptionProps) => {
    const { t } = useTranslation('riders')
    const exceptions = useExceptionStore().exceptions
    const guardians = useGuardianStore().guardians
    const stops = useStopStore().stops

    const exception = useMemo(() => {
        const foundException = exceptions.find((e) => e.id === exceptionId)
        return foundException
    }, [exceptions, exceptionId])

    const pickupGuardian = useMemo(() => {
        const filteredGuardian = guardians.find((g: GuardianType) => g.id === exception?.pickupGuardianId)
        return filteredGuardian
    }, [guardians, exception])

    const pickupStop = useMemo(() => {
        const filteredStop = stops.find((s: StopType) => s.id === pickupGuardian?.stopId)
        return filteredStop
    }, [pickupGuardian, stops])

    const dropoffGuardian = useMemo(() => {
        const filteredGuardian = guardians.find((g: GuardianType) => g.id === exception?.dropoffGuardianId)
        return filteredGuardian
    }, [guardians, exception])

    const dropoffStop = useMemo(() => {
        const filteredStop = stops.find((s: StopType) => s.id === dropoffGuardian?.stopId)
        return filteredStop
    }, [dropoffGuardian, stops])

    const pickup = useMemo(() => {
        return exception?.pickup
    }, [exception])

    const dropoff = useMemo(() => {
        return exception?.dropoff
    }, [exception])

    const exceptionDate = useMemo(() => {
        if (exception) {
            return dayjs(Number(exception.date)).format('dddd MMM DD YYYY')
        }

        return 'Loading...'
    }, [exception])

    return (
        <>
            {exception ?
                <Grid container spacing={2} sx={{ mb: 4, mt: 4 }}>
                    <Grid xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                            <Typography variant='h3'>{exceptionDate}</Typography>
                        </Box>
                    </Grid>
                    {pickup === 'override' && pickupGuardian ? <ExceptionStop title={t('pickup')} guardianLabel={`${pickupGuardian?.firstName} ${pickupGuardian?.lastName}`} pickupStopName={pickupStop?.stopName ?? ''} /> : null}
                    {dropoff === 'override' && dropoffGuardian ? <ExceptionStop title={t('dropoff')} guardianLabel={`${dropoffGuardian?.firstName} ${dropoffGuardian?.lastName}`} pickupStopName={dropoffStop?.stopName ?? ''} /> : null}
                    {pickup === 'noChange' ? <ExceptionStop title={t('pickup')} guardianLabel={t('noChange')} pickupStopName={t('noChange')} /> : null}
                    {dropoff === 'noChange' ? <ExceptionStop title={t('dropoff')} guardianLabel={t('noChange')} pickupStopName={t('noChange')} /> : null}
                    {pickup === 'cancel' ? <ExceptionStop title={t('pickup')} guardianLabel={t('noPickup')} pickupStopName={t('noPickup')} /> : null}
                    {dropoff === 'cancel' ? <ExceptionStop title={t('dropoff')} guardianLabel={t('noDropoff')} pickupStopName={t('noDropoff')} /> : null}
                </Grid>
                :
                <ExceptionSkeleton />
            }
            <Divider />
        </>
    )
}

interface ExceptionStopProps {
    title: string
    guardianLabel: string
    pickupStopName: string
}

const ExceptionStop = ({ title, guardianLabel, pickupStopName }: ExceptionStopProps) => {
    const { t } = useTranslation('riders')

    return (
        <Grid xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Typography variant='h4'>{title}</Typography>
            </Box>
            <Typography>{t('guardian')}: {guardianLabel}</Typography>
            <Typography>{t('stop')}: {pickupStopName}</Typography>
        </Grid>
    )
}

const ExceptionStopSkeleton = () => {
    return (
        <Grid xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Skeleton variant='text' height={40} />
            </Box>
            <Skeleton variant='text' height={40} />
            <Skeleton variant='text' height={40} />
        </Grid>
    )
}

const ExceptionSkeleton = () => {
    return (
        <Grid xs={12}>
            <Grid xs={12}>
                <Skeleton variant='text' height={40} />
            </Grid>
            <ExceptionStopSkeleton />
            <ExceptionStopSkeleton />
        </Grid>
    )
}

export default Exception