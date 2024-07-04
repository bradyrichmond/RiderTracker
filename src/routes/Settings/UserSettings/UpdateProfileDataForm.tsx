import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Box, Button, TextField } from '@mui/material'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'

interface ProfileFormInputs {
    firstName: string
    lastName: string
    email: string
}

const UpdateProfileDataForm = () => {
    const updateUserData = useUserStore().updateUserData
    const currentUser = useUserStore().currentUser
    const { firstName, lastName, email } = currentUser ?? {}
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const { t } = useTranslation('common')

    const { handleSubmit, register, formState: { isDirty }, reset } = useForm<ProfileFormInputs>({
        defaultValues: {
            firstName,
            lastName,
            email: email ?? ''
        }
    })

    const onSubmit = async () => {
        // TODO: handle update user attributes
        updateUserData()
        showDataChangeSnackbar()
        reset()
    }

    const showDataChangeSnackbar = () => {
        showErrorSnackbar(t('dataChangeComplete'))
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth label={t('firstName')} disabled {...register('firstName')} />
                <TextField fullWidth label={t('lastName')} disabled {...register('lastName')} />
                <TextField fullWidth label={t('email')} {...register('email', { required: true })} />
                <Button type='submit' variant='contained' disabled={!isDirty} fullWidth sx={{ mt: 2 }}>{t('submitChanges')}</Button>
            </form>
        </Box>
    )
}

export default UpdateProfileDataForm