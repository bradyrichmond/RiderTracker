import { Box, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import CancelIcon from '@mui/icons-material/Cancel'
import PauseIcon from '@mui/icons-material/Pause'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { useTranslation } from 'react-i18next'
import { SyntheticEvent } from 'react'

interface ExceptionTypeToggleButtonProps {
    title: string
    onChange: (_e: SyntheticEvent, value: string) => void
    value: string
}

const ExceptionTypeToggleButton = ({ title, onChange, value }: ExceptionTypeToggleButtonProps) => {
    const { t } = useTranslation('riders')

    return (
        <Grid xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ mt: 2, mb: 2 }}>{title}</Typography>
                <ToggleButtonGroup size='large' value={value} onChange={onChange} exclusive>
                    <ToggleButton value='noChange'>
                        <Tooltip title={t('noChange')}>
                            <PauseIcon sx={{ transform: 'rotate(90deg)' }} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value='cancel'>
                        <Tooltip title={t('cancel')}>
                            <CancelIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value='override'>
                        <Tooltip title={t('override')}>
                            <ChangeCircleIcon />
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Grid>
    )
}

export default ExceptionTypeToggleButton