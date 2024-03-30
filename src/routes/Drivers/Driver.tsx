import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { DriverType } from "../../types/DriverType"
import { ApiContext } from "../../contexts/ApiContext"

const Driver = () => {
    const roleContext = useContext(RoleContext)
    const [driver, setDriver] = useState<DriverType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        getDriverData()
    }, [roleContext, id])

    const getDriverData = async () => {
        if (id) {
            const driverData = await api.execute(api.drivers.getDriverById, [id])
            setDriver(driverData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Driver Name: {driver?.firstName} {driver?.lastName}</Typography>
            <Typography>Organization: {driver?.organizationId}</Typography>
        </Box>
    )
}

export default Driver