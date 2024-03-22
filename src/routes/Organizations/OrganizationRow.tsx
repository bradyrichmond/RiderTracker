import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { OrganizationType } from "../../types/OrganizationType"

interface OrganizationRowProps {
    entity: OrganizationType
}

const OrganizationRow = ({ entity }: OrganizationRowProps) => {
    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem'>
                <Link to={`/organizations/${entity.id}`}><Typography>{entity.id}</Typography></Link>
            </Box>
        </Box>
    )
}

export default OrganizationRow