import { ApiContext } from '@/contexts/ApiContextProvider'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Box, Button, TextField } from '@mui/material'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface PasswordFormInput {
    oldPassword: string
    newPassword: string
    verifyNewPassword: string
}

const UpdatePasswordForm = () => {
    const { handleSubmit, register } = useForm<PasswordFormInput>()
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const { api } = useContext(ApiContext)
    const { t } = useTranslation(['settings', 'common'])

    const onSubmit = (data: PasswordFormInput) => {
        const { oldPassword, newPassword, verifyNewPassword } = data
        const passwordVerified = verifyNewPasswordMatch(newPassword, verifyNewPassword)

        if (!passwordVerified) {
            showPasswordMismatchSnackbar()
            return
        }

        submitPasswordChangeRequest(oldPassword, newPassword)
    }

    const submitPasswordChangeRequest = async (oldPassword: string, newPassword: string) => {
        try {
            await api.users.changeUserPassword(oldPassword, newPassword)
        } catch {
            showPasswordSetFailureSnackbar()
        }
    }

    const showPasswordSetFailureSnackbar = () => {
        showErrorSnackbar(t('passwordChangeFailed', { ns: 'common' }))
    }

    const showPasswordMismatchSnackbar = () => {
        showErrorSnackbar(t('passwordNoMatchError', { ns: 'common' }))
    }

    const verifyNewPasswordMatch = (pw1: string, pw2: string) => {
        return pw1 === pw2
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField type='password' fullWidth label={t('currentPassword', { ns: 'common' })} {...register('oldPassword')} />
                <TextField type='password' fullWidth label={t('newPassword', { ns: 'common' })} {...register('newPassword')} />
                <TextField
                    type='password'
                    fullWidth
                    label={t('retypePassword', { ns: 'common' })}
                    {...register('verifyNewPassword')}
                />
                <Button type='submit' variant='contained' fullWidth sx={{ mt: '1rem' }}>{t('changePassword', { ns: 'common' })}</Button>
            </form>
        </Box>
    )
}

export default UpdatePasswordForm