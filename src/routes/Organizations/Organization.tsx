import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { OrganizationType } from "../../types/OrganizationType"
import { getOrganizationById } from "../../API"

const Organization = () => {
    const roleContext = useContext(RoleContext)
    const [organization, setOrganization] = useState<OrganizationType>()
    const { id } = useParams()

    useEffect(() => {
        getOrganizationData()
    }, [roleContext.token, id])

    const getOrganizationData = async () => {
        if (id) {
            const rawOrganizationData = await getOrganizationById(roleContext.token, id)
            const organizationData = await rawOrganizationData.json()
            setOrganization(organizationData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Organization Id: {organization?.id}</Typography>
        </Box>
    )
}

export default Organization