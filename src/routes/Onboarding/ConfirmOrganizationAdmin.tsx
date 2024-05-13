import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useTranslation } from 'react-i18next'

const ConfirmOrganizationAdmin = () => {
    const { register } = useFormContext()
    const { t } = useTranslation('onboarding')

    return (
        <Box>
            <Typography variant='h5'>
                {t('emailConfirmationCode')}
            </Typography>
            <TextField label={t('confirmationCode')} {...register('confirmationCode')} fullWidth/>
        </Box>
    )
}

export default ConfirmOrganizationAdmin