import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { SnackbarContext } from "@/contexts/SnackbarContextProvider"
import { Box, Button, TextField } from "@mui/material"
import { useMemo, useContext } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from 'react-i18next'

interface ProfileFormInputs {
    firstName: string
    lastName: string
    email: string
}

const UpdateProfileDataForm = () => {
    const { userFullName, userEmail, userId, updateUserData } = useContext(RoleContext)
    const { setSnackbarMessage, setSnackbarSeverity, setSnackbarVisibilityMs } = useContext(SnackbarContext)
    const { api } = useContext(ApiContext)
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
        await api.admin.updateUserAttributes(formattedData, userId)
        updateUserData()
        showDataChangeSnackbar()
        reset()
    }

    const showDataChangeSnackbar = () => {
        setSnackbarSeverity('info')
        setSnackbarVisibilityMs(10000)
        setSnackbarMessage(t('dataChangeComplete'))
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
                <TextField fullWidth label={t('email')} {...register('email', { required: true})} />
                <Button type='submit' variant='contained' disabled={!isDirty} fullWidth sx={{mt: '1rem'}}>{t('submitChanges')}</Button>
            </form>
        </Box>
    )
}

export default UpdateProfileDataForm