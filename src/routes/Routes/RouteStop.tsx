import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

const RouteStop = () => {
    const { stopId } = useParams()

    return (
        <Box>
            {stopId}
        </Box>
    )
}

export default RouteStop