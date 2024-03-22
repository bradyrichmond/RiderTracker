import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { DriverType } from "../../types/DriverType"

interface DriverRowProps {
    entity: DriverType
}

const DriverRow = ({ entity }: DriverRowProps) => {
    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem'>
                <Link to={`/drivers/${entity.id}`}><Typography>{entity.id}</Typography></Link>
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

export default DriverRow