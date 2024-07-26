import { Box, Paper, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useRiderStore } from '@/store/RiderStore'
import Grid from '@mui/material/Unstable_Grid2'
import RiderSpeedDial from './RiderSpeedDial'
import { RiderType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

interface RiderProps {
    activeRider?: string
}

const Rider = ({ activeRider: riderId }: RiderProps) => {
    const riders = useRiderStore().riders
    const updateRiders = useRiderStore().updateRiders
    const updateUsers = useUserStore().updateUsers

    useEffect(() => {
        updateRiders()
        updateUsers()
    }, [updateRiders, updateUsers])

    const rider = useMemo(() => {
        return riders.find((r: RiderType) => r.id === riderId)
    }, [riders, riderId])

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
            </Grid>
        </Box>
    )
}

export default Rider