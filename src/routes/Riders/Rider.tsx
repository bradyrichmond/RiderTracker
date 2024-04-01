import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import RidersGuardians from "./RidersGuardians"
import { ApiContext } from "../../contexts/ApiContextProvider"

const Rider = () => {
    const roleContext = useContext(RoleContext)
    const { api } = useContext(ApiContext)
    const [rider, setRider] = useState<RiderType>()
    const { id } = useParams()

    useEffect(() => {
        getRiderData()
    }, [roleContext, id])

    const getRiderData = async () => {
        if (id) {
            const riderData = await api.execute(api.riders.getRiderById, [id])
            setRider(riderData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Rider Name: {rider?.firstName} {rider?.lastName}</Typography>
            <Typography>Organization: {rider?.organizationId}</Typography>
            {rider ? <RidersGuardians rider={rider} getRiderData={getRiderData} /> : null}
        </Box>
    )
}

export default Rider