import { Box, Button, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

interface RouteDrawerDetailListItemProps {
    id: string
    label: string
    action(id: string): void
}

const RouteDrawerDetailListItem = ({ id, action, label }: RouteDrawerDetailListItemProps) => {
    const handleInfoClick = () => {
        action(id)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', m: '1rem' }}>
            <Box sx={{ flex: 1 }}>
                <Typography>{label}</Typography>
            </Box>
            <Box>
                <Button variant='contained' onClick={handleInfoClick}>
                    <InfoIcon />
                </Button>
            </Box>
        </Box>
    )
}

export default RouteDrawerDetailListItem