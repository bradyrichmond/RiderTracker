import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { ApiContext } from "../../contexts/ApiContextProvider"
import { UserType } from "@/types/UserType"
import { RoleContext } from "@/contexts/RoleContextProvider"

const Driver = () => {
    const [driver, setDriver] = useState<UserType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { organizationId } = useContext(RoleContext)

    useEffect(() => {
        getDriverData()
    }, [id])

    const getDriverData = async () => {
        if (id) {
            const driverData = await api.users.getUserById(organizationId, id)
            setDriver(driverData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Driver Name: {driver?.firstName} {driver?.lastName}</Typography>
            <Typography>Organization: {driver?.orgId}</Typography>
        </Box>
    )
}

export default Driver