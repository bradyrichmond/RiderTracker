import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { getRiderById } from "../../API"

const Rider = () => {
    const roleContext = useContext(RoleContext)
    const [rider, setRider] = useState<RiderType>()
    const { id } = useParams()

    useEffect(() => {
        getRiderData()
    }, [roleContext.token, id])

    const getRiderData = async () => {
        if (id) {
            const rawRiderData = await getRiderById(roleContext.token, id)
            const riderData = await rawRiderData.json()
            setRider(riderData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Rider Name: {rider?.firstName} {rider?.lastName}</Typography>
            <Typography>Organization: {rider?.organizationId}</Typography>
        </Box>
    )
}

export default Rider