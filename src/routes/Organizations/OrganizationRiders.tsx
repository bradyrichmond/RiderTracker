import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { getRidersForOrganization } from "../../API"
import { RiderType } from "../../types/RiderType"
import RiderRow from "../Riders/RiderRow"
import { useParams } from "react-router-dom"

const OrganizationRiders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const { id: organizationId } = useParams()
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
    }, [roleContext.token, organizationId])

    const updateRiders = async () => {
        if (organizationId) {
            const riderData = await getRidersForOrganization(roleContext.token, organizationId)
            setRiders(riderData);
        }
    }

    return (
        <Box>
            <Typography variant="h2">Riders</Typography>
            {riders.length > 0 && riders.map((r) => <RiderRow key={r.id} entity={r} />)}
        </Box>
    )
}

export default OrganizationRiders