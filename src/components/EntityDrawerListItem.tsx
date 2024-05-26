import { Box, Button, Tooltip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

interface EntityDrawerDetailListItemProps {
    id: string
    label: string
    action(id: string): void
    tooltipTitle: string
}

const EntityDrawerDetailListItem = ({ id, action, label, tooltipTitle }: EntityDrawerDetailListItemProps) => {
    const handleInfoClick = () => {
        action(id)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', m: '1rem' }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Typography>{label}</Typography>
            </Box>
            <Box>
                <Tooltip title={tooltipTitle}>
                    <Button variant='contained' onClick={handleInfoClick}>
                        <InfoIcon />
                    </Button>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default EntityDrawerDetailListItem