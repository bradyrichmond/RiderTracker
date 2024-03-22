import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { GuardianType } from "../../types/GuardianType"

interface GuardianRowProps {
    entity: GuardianType
}

const GuardianRow = ({ entity }: GuardianRowProps) => {
    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem'>
                <Link to={`/guardians/${entity.id}`}><Typography>{entity.id}</Typography></Link>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.firstName}</Typography>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.lastName}</Typography>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.organizationId}</Typography>
            </Box>
        </Box>
    )
}

export default GuardianRow