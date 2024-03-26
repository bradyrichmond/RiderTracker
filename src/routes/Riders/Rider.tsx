import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { getRiderById } from "../../API"
import RidersGuardians from "./RidersGuardians"

const Rider = () => {
    const roleContext = useContext(RoleContext)
    const [rider, setRider] = useState<RiderType>()
    const { id } = useParams()

    useEffect(() => {
        getRiderData()
    }, [roleContext.token, id])

    const getRiderData = async () => {
        if (id) {
            const riderData = await getRiderById(roleContext.token, id)
            setRider(riderData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Rider Name: {rider?.firstName} {rider?.lastName}</Typography>
            <Typography>Organization: {rider?.organizationId}</Typography>
            {rider ? <RidersGuardians organizationId={rider?.organizationId ?? ''} rider={rider} /> : null}
        </Box>
    )
}

export default Rider