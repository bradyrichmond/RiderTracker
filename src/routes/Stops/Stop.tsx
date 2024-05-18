import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { StopType } from '@/types/StopType'
import { useParams } from 'react-router-dom'
import { ApiContext } from "@/contexts/ApiContextProvider"
import { OrgDataContext } from "@/contexts/OrgDataContext"

const Stop = () => {
    const [stop, setStop] = useState<StopType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { orgId } = useContext(OrgDataContext)

    useEffect(() => {
        getStopData()
    }, [id])

    const getStopData = async () => {
        if (id) {
            const stopData = await api.stops.getStopById(orgId, id)
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