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

interface LoginFormInputs {
    username: string
    password: string
}

const LoginForm = () => {
    const { handleSubmit, register } = useForm<LoginFormInputs>()
    const { heaviestRole, updateUserData, userId } = useUserStore()
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
        const { username, password } = data
        setErrorMessage('')

        if (!username || !password) {
            setErrorMessage(t('usernamePasswordRequired'))
            return
        }

        try {
            await signIn(data)
            await postLoginChecks()
        } catch (e) {
            console.error(e)
            signOut()
            setErrorMessage(t('authFailed'))
            setDisabledButtons(false)
        }
    }

    const postLoginChecks = async () => {
        const api = await useApiStore.getState().getApi()

        if (api) {
            const path = window.location.toString().split('//')[1]
            const pathOrgSlug = path.split('.')[0]
            const orgSlugResponse = await api.organizations.getOrganizationLoginDataBySlug(pathOrgSlug)
            const { id } = orgSlugResponse
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
            <Box sx={{ pl: '2rem', pr: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {organizationLoginImageUrl ?
                        <img src={organizationLoginImageUrl} alt={`${orgName}`} />
                        :
                        <Typography variant='h3'>
                            {orgName}
                        </Typography>
                    }
                </Box>
                <Box sx={{ mt: '2rem' }}>
                    <form onSubmit={handleSubmit(login)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField label={t('email')} {...register('username')} />
                            <TextField type='password' label={t('password')} {...register('password')} />
                        </Box>
                        <Typography sx={{ color: 'red' }}>{errorMessage ?? ' '}</Typography>
                        <Button type='submit' variant='contained' disabled={disableButtons} sx={{ mt: '2rem' }} fullWidth>{t('signIn')}</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm