import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { GuardianType } from "../../types/GuardianType"
import { getGuardianById } from "../../API"
import GuardiansRiders from "./GuardiansRiders"

const Guardian = () => {
    const roleContext = useContext(RoleContext)
    const [guardian, setGuardian] = useState<GuardianType>()
    const { id } = useParams()

    useEffect(() => {
        getGuardianData()
    }, [roleContext.token, id])

    const getGuardianData = async () => {
        if (id) {
            try {
                const guardianData = await getGuardianById(roleContext.token, id)
                setGuardian(guardianData)
            } catch {
                console.error('Error setting guardian')
            }
        }
    }

    return (
        <Box height='100%'>
            <Typography>Guardian Name: {guardian?.firstName} {guardian?.lastName}</Typography>
            <Typography>Organization: {guardian?.organizationId}</Typography>
            <Typography>links: {guardian?.guardianRiderLinks}</Typography>
            {guardian ? <GuardiansRiders organizationId={guardian?.organizationId ?? ''} guardian={guardian} getGuardianData={getGuardianData} /> : null}
        </Box>
    )
}

export default Guardian