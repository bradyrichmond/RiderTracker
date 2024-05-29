import { Box, Chip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { StopType } from '@/types/StopType'
import { useRiderStore } from '@/store/RiderStore'
import { useStopStore } from '@/store/StopStore'

const Rider = () => {
    const { getRiderById } = useRiderStore()
    const { getBulkStopsById } = useStopStore()
    const [rider, setRider] = useState<RiderType>()
    const [stops, setStops] = useState<StopType[]>([])
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        const getRiderData = async () => {
            if (id) {
                const riderData = await getRiderById(id)
                setRider(riderData)
            }
        }

        const getStopData = async () => {
            if (rider) {
                const fetchedStops = await getBulkStopsById(rider?.stopIds ?? [])
                setStops(fetchedStops ?? [])
            }
        }

        getRiderData()
        getStopData()
    }, [id, rider, getRiderById, getBulkStopsById])

    const handleChipClick = (stopId: string) => {
        navigate(`/stops/${stopId}`)
    }


    return (
        <Box height='100%'>
            <Typography>Rider Name: {rider?.firstName} {rider?.lastName}</Typography>
            <Typography>Organization: {rider?.orgId}</Typography>
            <Box sx={{ mt: '1rem', mb: '1rem' }}>
                {
                    stops.map((s) => {
                        return (
                            <Chip key={s.id} label={s.stopName} onClick={() => handleChipClick(s.id)} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default Rider