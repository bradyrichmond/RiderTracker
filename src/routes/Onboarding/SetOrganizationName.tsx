import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useTranslation } from 'react-i18next'

const SetOrganizationName = () => {
    const { register } = useFormContext()
    const { t } = useTranslation(['onboarding', 'common'])

    return (
        <Box>
            <Typography variant='h5'>{t('setOrgNameDescription')}</Typography>
            <TextField label={t('orgName', { ns: 'common' })} {...register('orgName')} fullWidth/>
        </Box>
    )
}

export default SetOrganizationName