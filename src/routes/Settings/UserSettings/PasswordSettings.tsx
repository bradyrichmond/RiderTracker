import { Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import UpdatePasswordForm from './UpdatePasswordForm'
import { useTranslation } from 'react-i18next'

const PasswordSettings = () => {
    const { t } = useTranslation('settings')
    return (
        <Grid sm={12} md={6}>
            <Card sx={{ p: 4 }}>
                <Typography variant='h4' sx={{ pb: 1 }}>
                    {t('updatePassword')}
                </Typography>
                <UpdatePasswordForm />
            </Card>
        </Grid>
    )
}

export default PasswordSettings