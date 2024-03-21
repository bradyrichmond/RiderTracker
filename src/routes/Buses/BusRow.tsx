import { Box, Typography } from "@mui/material"
import { BusType } from "../../types/BusType"
import { Link } from "react-router-dom"

interface BusRowProps {
    entity: BusType
}

const BusRow = ({ entity }: BusRowProps) => {
    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem'>
                <Link to={`/buses/${entity.id}`}>
                    <Typography>{entity.id}</Typography>
                </Link>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.busNumber}</Typography>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.organizationId}</Typography>
            </Box>
        </Box>
    )
}

export default BusRow