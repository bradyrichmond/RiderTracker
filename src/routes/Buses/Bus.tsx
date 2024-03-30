import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { BusType } from '../../types/BusType'
import { useParams } from 'react-router-dom'
import { ApiContext } from "../../contexts/ApiContext"

const Bus = () => {
    const roleContext = useContext(RoleContext)
    const [bus, setBus] = useState<BusType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        getBusData()
    }, [roleContext, id])

    const getBusData = async () => {
        if (id) {
            const busData = await api.execute(api.buses.getBusById, [id])
            setBus(busData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Bus Number: {bus?.busNumber}</Typography>
            <Typography>Organization: {bus?.organizationId}</Typography>
        </Box>
    )
}

export default Bus