import { Box, Button, Tooltip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

interface EntityDrawerDetailListItemProps {
    id: string
    label: string
    action?: (id: string) => void
    tooltipTitle: string
}

const EntityDrawerDetailListItem = ({ id, action, label, tooltipTitle }: EntityDrawerDetailListItemProps) => {
    const handleInfoClick = () => {
        if (action) {
            action(id)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Typography>{label}</Typography>
            </Box>
            {action ?
                <Box>
                    <Tooltip title={tooltipTitle}>
                        <Button variant='contained' onClick={handleInfoClick}>
                            <InfoIcon />
                        </Button>
                    </Tooltip>
                </Box>
                :
                null
            }
        </Box>
    )
}

export default EntityDrawerDetailListItem