import { Box, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const CreateOrganizationAdmin = () => {
    const { register } = useFormContext()
    const { t } = useTranslation(['onboarding', 'common'])

    return (
        <Box>
            <Typography variant='h5'>{t('createFirstAdmin')}</Typography>
            <TextField label={t('firstName', { ns: 'common' })} {...register('adminFirstName')} fullWidth />
            <TextField label={t('lastName', { ns: 'common' })} {...register('adminLastName')} fullWidth />
            <TextField label={t('email', { ns: 'common' })} {...register('adminEmail')} fullWidth />
            <TextField type="password" label={t('password', { ns: 'common' })} {...register('adminPassword')} fullWidth />
        </Box>
    )
}

export default CreateOrganizationAdmin