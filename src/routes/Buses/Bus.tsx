import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { BusType } from '../../types/BusType'
import { getBusById } from "../../API"
import { useParams } from 'react-router-dom'

const Bus = () => {
    const roleContext = useContext(RoleContext)
    const [bus, setBus] = useState<BusType>()
    const { id } = useParams()

    useEffect(() => {
        getBusData()
    }, [roleContext.token, id])

    const getBusData = async () => {
        if (id) {
            const rawBusData = await getBusById(roleContext.token, id)
            const busData = await rawBusData.json()
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