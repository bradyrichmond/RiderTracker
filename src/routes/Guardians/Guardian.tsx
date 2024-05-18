import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { ApiContext } from "@/contexts/ApiContextProvider"
import { GuardianType } from "@/types/UserType"
import { OrgDataContext } from "@/contexts/OrganizationDataContext"

const Guardian = () => {
    const [guardian, setGuardian] = useState<GuardianType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { orgId } = useContext(OrgDataContext)

    useEffect(() => {
        getGuardianData()
    }, [id])

    const getGuardianData = async () => {
        if (id) {
            try {
                const guardianData = await api.users.getGuardianById(orgId, id)
                setGuardian(guardianData)
            } catch {
                console.error('Error setting guardian')
            }
        }
    }

    return (
        <Box height='100%'>
            <Typography>Guardian Name: {guardian?.firstName} {guardian?.lastName}</Typography>
            <Typography>Organization: {guardian?.orgId}</Typography>
        </Box>
    )
}

export default Guardian