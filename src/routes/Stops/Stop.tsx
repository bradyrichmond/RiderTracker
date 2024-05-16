import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { StopType } from '@/types/StopType'
import { useParams } from 'react-router-dom'
import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"

const Stop = () => {
    const [stop, setStop] = useState<StopType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { organizationId } = useContext(RoleContext)

    useEffect(() => {
        getStopData()
    }, [id])

    const getStopData = async () => {
        if (id) {
            const stopData = await api.stops.getStopById(organizationId, id)
            setStop(stopData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Stop Name: {stop?.stopName}</Typography>
            <Typography>Organization: {stop?.orgId}</Typography>
        </Box>
    )
}

export default Stop