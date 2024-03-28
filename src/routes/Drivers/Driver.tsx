import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { DriverType } from "../../types/DriverType"
import { getDriverById } from "../../API"

const Driver = () => {
    const roleContext = useContext(RoleContext)
    const [driver, setDriver] = useState<DriverType>()
    const { id } = useParams()

    useEffect(() => {
        getDriverData()
    }, [roleContext.token, id])

    const getDriverData = async () => {
        if (id) {
            const driverData = await getDriverById(roleContext.token, id)
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