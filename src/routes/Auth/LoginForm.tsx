import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn, signOut } from '@aws-amplify/auth'
import { useNavigate } from 'react-router-dom'
import { Hub } from 'aws-amplify/utils'
import { useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'
import { useApiStore } from '@/store/ApiStore'
import { useUserStore } from '@/store/UserStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/validation/loginSchema'
import { ERROR_NAMES } from '@/constants/ErrorNames'

interface LoginFormInputs {
    username: string
    password: string
}

const LoginForm = () => {
    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm<LoginFormInputs>({ resolver: yupResolver(loginSchema) })
    const { heaviestRole, updateUserData } = useUserStore()
    const { orgName, organizationLoginImageUrl, updateOrgData } = useOrgStore()
    const [errorMessage, setErrorMessage] = useState('')
    const [disableButtons, setDisabledButtons] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation(['auth', 'common'])

    useEffect(() => {
        updateOrgData()

        const cleanup = Hub.listen('auth', async ({ payload: { event } }) => {
            if (event === 'signedIn') {
                try {
                    await updateUserData()
                } catch (e) {
                    setErrorMessage(e as string)
                }
            }
        })

        return () => {
            cleanup()
        }
    }, [updateOrgData, updateUserData])

    const login = async (data: LoginFormInputs) => {
        setDisabledButtons(true)
        setErrorMessage('')

        try {
            await signIn(data)
            await postLoginChecks()
        } catch (e) {
            if (e instanceof Error) {
                console.error(`${e.name} ${e.message}`)

                if (e.name === ERROR_NAMES.UserAlreadyAuthenticated) {
                    await signOut()
                    await login(data)
                    return
                }
            }

            setErrorMessage(t('authFailed'))
            setDisabledButtons(false)
        }
    }

    const postLoginChecks = async () => {
        const api = await useApiStore.getState().getApi(true)

        if (api) {
            const path = window.location.toString().split('//')[1]
            const pathOrgSlug = path.split('.')[0]
            const orgSlugResponse = await api.organizations.getOrganizationLoginDataBySlug(pathOrgSlug)
            const { id } = orgSlugResponse

            const userId = await useUserStore.getState().getUserId()

            const previousPath = history.state?.usr?.previousPath
            const userOrgIds: string | string[] | undefined = await api?.organizations.getOrgIdForUser(userId, heaviestRole)

            if ((Array.isArray(userOrgIds) && !userOrgIds.some((o) => o === id)) || userOrgIds !== id) {
                signOut()
                throw 'User does not have access to organization.'
            }

            navigate(previousPath ?? '/app')
        }
    }

    return (
        <Box sx={{ flex: 1 }}>
            <Box sx={{ pl: 4, pr: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {organizationLoginImageUrl ?
                        <img src={organizationLoginImageUrl} alt={`${orgName}`} />
                        :
                        <Typography variant='h3'>
                            {orgName}
                        </Typography>
                    }
                </Box>
                <Box sx={{ mt: 4 }}>
                    <form onSubmit={handleSubmit(login)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                label={t('email')}
                                {...register('username')}
                                error={!!errors.username?.message && touchedFields.username}
                                helperText={errors.username?.message ? t(errors.username.message, { ns: 'common' }) : ''}
                            />
                            <TextField
                                type='password'
                                label={t('password')}
                                {...register('password')}
                                error={!!errors.password?.message && touchedFields.password}
                                helperText={errors.password?.message ? t(errors.password.message, { ns: 'common' }) : ''}
                            />
                        </Box>
                        <Typography sx={{ color: 'red' }}>{errorMessage ?? ' '}</Typography>
                        <Button type='submit' variant='contained' disabled={disableButtons} sx={{ mt: 4 }} fullWidth>{t('signIn')}</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm