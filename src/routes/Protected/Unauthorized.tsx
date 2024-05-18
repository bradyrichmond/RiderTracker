import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Unauthorized = () => {
    const { t } = useTranslation('common')

    return (
        <Box>{t('unauthorized')}</Box>
    )
}

export default Unauthorized