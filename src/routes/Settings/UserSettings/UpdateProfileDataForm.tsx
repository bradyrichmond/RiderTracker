import { useApiStore } from '@/store/ApiStore'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Box, Button, TextField } from '@mui/material'
import { useMemo, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'

interface ProfileFormInputs {
    firstName: string
    lastName: string
    email: string
}

const UpdateProfileDataForm = () => {
    const { userFullName, userEmail, userId, updateUserData } = useUserStore()
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const { api } = useApiStore()
    const { t } = useTranslation('common')

    const { firstName, lastName } = useMemo(() => {
        const splitFullName = userFullName.split(' ')
        const lastName = splitFullName.pop()
        const firstName = splitFullName.join(' ')
        return {
            firstName,
            lastName
        }
    }, [userFullName])

    const { handleSubmit, register, formState: { isDirty }, reset } = useForm<ProfileFormInputs>({
        defaultValues: {
            firstName,
            lastName,
            email: userEmail
        }
    })

    const onSubmit = async (data: ProfileFormInputs) => {
        const formattedData = mapFormDataToCognito(data)
        await api?.admin.updateUserAttributes(formattedData, userId)
        updateUserData()
        showDataChangeSnackbar()
        reset()
    }

    const showDataChangeSnackbar = () => {
        showErrorSnackbar(t('dataChangeComplete'))
    }

    const mapFormDataToCognito = (data: ProfileFormInputs) => {
        return [
            { Name: 'given_name', Value: data.firstName },
            { Name: 'family_name', Value: data.lastName },
            { Name: 'email', Value: data.email }
        ]
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth label={t('firstName')} disabled {...register('firstName')} />
                <TextField fullWidth label={t('lastName')} disabled {...register('lastName')} />
                <TextField fullWidth label={t('email')} {...register('email', { required: true })} />
                <Button type='submit' variant='contained' disabled={!isDirty} fullWidth sx={{ mt: '1rem' }}>{t('submitChanges')}</Button>
            </form>
        </Box>
    )
}

export default UpdateProfileDataForm