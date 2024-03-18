import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { useParams } from 'react-router-dom'
import { GuardianType } from "../../types/GuardianType"
import { getGuardianById } from "../../API"

const Guardian = () => {
    const roleContext = useContext(RoleContext)
    const [guardian, setGuardian] = useState<GuardianType>()
    const { id } = useParams()

    useEffect(() => {
        getGuardianData()
    }, [roleContext.token, id])

    const getGuardianData = async () => {
        if (id) {
            const rawGuardianData = await getGuardianById(roleContext.token, id)
            const guardianData = await rawGuardianData.json()
            setGuardian(guardianData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Guardian Name: {guardian?.firstName} {guardian?.lastName}</Typography>
            <Typography>Organization: {guardian?.organizationId}</Typography>
        </Box>
    )
}

export default Guardian