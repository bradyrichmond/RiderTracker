import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { getGuardiansForOrganization } from "../../API"
import { useParams } from "react-router-dom"
import { GuardianType } from "../../types/GuardianType"
import GuardianRow from "../Guardians/GuardianRow"

const OrganizationGuardians = () => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const { id: organizationId } = useParams()
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateGuardians()
    }, [roleContext.token, organizationId])

    const updateGuardians = async () => {
        if (organizationId) {
            const guardianData = await getGuardiansForOrganization(roleContext.token, organizationId)
            setGuardians(guardianData);
        }
    }

    return (
        <Box>
            <Typography variant="h2">Guardians</Typography>
            {guardians.length > 0 && guardians.map((g) => <GuardianRow key={g.id} entity={g} />)}
        </Box>
    )
}

export default OrganizationGuardians