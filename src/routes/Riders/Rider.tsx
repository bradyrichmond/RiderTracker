import { Box, Chip, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { StopType } from '@/types/StopType'
import { useOrgStore } from '@/store/OrgStore'

const Rider = () => {
    const { orgId } = useOrgStore()
    const { api } = useContext(ApiContext)
    const [rider, setRider] = useState<RiderType>()
    const [stops, setStops] = useState<StopType[]>([])
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        getRiderData()
    }, [id])

    useEffect(() => {
        getStopData()
    }, [rider])

    const handleChipClick = (stopId: string) => {
        navigate(`/stops/${stopId}`)
    }

    const getRiderData = async () => {
        if (id) {
            const riderData = await api.riders.getRiderById(orgId, id)
            setRider(riderData)
        }
    }

    const getStopData = async () => {
        const fetchedStops = await api.stops.getBulkStopsByIds(orgId, rider?.stopIds ?? [])
        setStops(fetchedStops)
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