import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { RiderType } from "../../types/RiderType"

interface RiderRowProps {
    entity: RiderType
}

const RiderRow = ({ entity }: RiderRowProps) => {
    return (
        <Box key={entity.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
            <Box padding='2rem'>
                <Link to={`/riders/${entity.id}`}><Typography>{entity.id}</Typography></Link>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.firstName}</Typography>
            </Box>
            <Box padding='2rem'>
                <Typography>{entity.lastName}</Typography>
            </Box>
        </Box>
    )
}

export default RiderRow