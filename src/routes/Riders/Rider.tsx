import { Box, Chip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { useNavigate, useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { ApiContext } from "../../contexts/ApiContextProvider"
import { StopType } from "@/types/StopType"

const Rider = () => {
    const { organizationId } = useContext(RoleContext)
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
            const riderData = await api.riders.getRiderById(organizationId, id)
            setRider(riderData)
        }
    }

    const getStopData = async () => {
        const fetchedStops = await api.stops.getBulkStopsByIds(organizationId, rider?.stopIds ?? [])
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