import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { StopType } from '@/types/StopType'
import { useParams } from 'react-router-dom'
import { ApiContext } from "@/contexts/ApiContextProvider"
import StopsRiders from "./StopsRiders"

const Stop = () => {
    const [stop, setStop] = useState<StopType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        getStopData()
    }, [id])

    const getStopData = async () => {
        if (id) {
            const stopData = await api.execute(api.stops.getStopById, [id])
            setStop(stopData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Stop Name: {stop?.stopName}</Typography>
            <Typography>Organization: {stop?.organizationId}</Typography>
            {stop ? <StopsRiders stop={stop} getStopData={getStopData}/> : null}
        </Box>
    )
}

export default Stop