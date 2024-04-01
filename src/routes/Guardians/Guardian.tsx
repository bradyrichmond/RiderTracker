import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { useParams } from 'react-router-dom'
import { GuardianType } from "../../types/GuardianType"
import GuardiansRiders from "./GuardiansRiders"
import { ApiContext } from "../../contexts/ApiContext"

const Guardian = () => {
    const roleContext = useContext(RoleContext)
    const [guardian, setGuardian] = useState<GuardianType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        getGuardianData()
    }, [roleContext, id])

    const getGuardianData = async () => {
        if (id) {
            try {
                const guardianData = await api.execute(api.guardians.getGuardianById, [id])
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
            {guardian ? <GuardiansRiders guardian={guardian} getGuardianData={getGuardianData} /> : null}
        </Box>
    )
}

export default Guardian