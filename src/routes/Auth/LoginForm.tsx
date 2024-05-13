import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { signIn, signOut, fetchAuthSession } from '@aws-amplify/auth'
import { API_BASE_NAME } from "@/API"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { getOrganizationIdForUser } from "@/helpers/GetOrganizationIdForUser"
import { getHeaviestRole } from "@/helpers/GetHeaviestRole"
import { RiderTrackerRole, isRiderTrackerRole } from "@/constants/Roles"
import { OrganizationType } from "@/types/OrganizationType"
import { useNavigate } from "react-router-dom"
import { Hub } from "aws-amplify/utils"
import { useTranslation } from 'react-i18next'

interface LoginFormInputs {
    username: string
    password: string
}

const LoginForm = () => {
    const { handleSubmit, register } = useForm<LoginFormInputs>()
    const { organizationLoginImageUrl, setOrganizationLoginImageUrl, setUserId } = useContext(RoleContext)
    const [orgName, setOrgName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [orgId, setOrgId] = useState('')
    const [disableButtons, setDisabledButtons] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation(['auth', 'common'])

    useEffect(() => {
        const path = window.location.toString().split('//')[1]
        const pathOrgSlug = path.split('.')[0]
        getOrgData(pathOrgSlug)

        // @ts-ignore data is type AuthUser
        const cleanup = Hub.listen('auth', async ({ payload: { event, data } }) => {
            if (event === "signedIn") {
                try {
                    await postLoginChecks()
                } catch (e) {
                    setErrorMessage(e as string)
                }
            }
        })

        return () => {
            cleanup()
        }
    }, [])

    useEffect(()=> {
        setDisabledButtons(true)
        if (orgId) {
            setDisabledButtons(false)
        }
    }, [orgId])

    const getOrgData = async (slug: string) => {
        const orgSlugResponse = await fetch(`${API_BASE_NAME}/public/organizations/${slug}`)
        const { orgName: fetchedOrgName, loginImageKey, id } = await orgSlugResponse.json()
        setOrgId(id)
        setOrgName(fetchedOrgName)
        if (loginImageKey) {
            setOrganizationLoginImageUrl(`https://s3.us-west-2.amazonaws.com/${loginImageKey}`)
        }
    }

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
        } catch (e) {
            console.error(e)
            signOut()
            setErrorMessage(t('authFailed'))
            setDisabledButtons(false)
        }
    }

    const postLoginChecks = async () => {
        const session = await fetchAuthSession()
        const tokens = session.tokens
        const path = window.location.toString().split('//')[1]
        const pathOrgSlug = path.split('.')[0]
        const orgSlugResponse = await fetch(`${API_BASE_NAME}/public/organizations/${pathOrgSlug}`)
        const { id } = await orgSlugResponse.json()
        const previousPath = history.state?.usr?.previousPath

        if (tokens) {
            const { idToken } = tokens
            const sessionGroups = idToken?.payload["cognito:groups"]
            const sessionGroupsArray = (sessionGroups as Array<string>).filter((s) => isRiderTrackerRole(s))

            const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(sessionGroupsArray ?? [])
            const sessionUserId = session.userSub

            if (sessionUserId) {
                const userOrgIds: string | OrganizationType[] = await getOrganizationIdForUser(sessionUserId, heaviestRoleFromGroups)

                if ((Array.isArray(userOrgIds) && !userOrgIds.some((o) => o.id === id)) || userOrgIds !== id) {
                    signOut()
                    throw 'User does not have access to organization.'
                }

                setUserId(sessionUserId)
                navigate(previousPath ?? '/app')
            }
        }
    }

    return (
        <Box sx={{ flex: 1 }}>
            <Box sx={{ pl: '2rem', pr: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {organizationLoginImageUrl ? 
                        <img src={organizationLoginImageUrl} alt={`${orgName}`}/>
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