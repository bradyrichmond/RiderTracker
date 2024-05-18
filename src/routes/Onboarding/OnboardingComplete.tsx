import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const OnboardingComplete = () => {
    const { t } = useTranslation('onboarding')

    return (
        <Box>
            <Typography variant='h6'>{t('finishOnboarding')}</Typography>
        </Box>
    )
}

export default OnboardingComplete