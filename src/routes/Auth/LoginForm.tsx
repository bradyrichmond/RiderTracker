import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { signIn, signOut, getCurrentUser, fetchAuthSession } from '@aws-amplify/auth'
import { AuthContext } from "@/contexts/AuthContextProvider"
import { API_BASE_NAME } from "@/API"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { getOrganizationIdForUser } from "@/helpers/GetOrganizationIdForUser"
import { getHeaviestRole } from "@/helpers/GetHeaviestRole"
import { RiderTrackerRole, isRiderTrackerRole } from "@/constants/Roles"
import { OrganizationType } from "@/types/OrganizationType"

interface LoginFormInputs {
    username: string
    password: string
}

const LoginForm = () => {
    const { handleSubmit, register } = useForm<LoginFormInputs>()
    const { organizationLoginImageUrl, setOrganizationLoginImageUrl } = useContext(RoleContext)
    const [orgName, setOrgName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [orgId, setOrgId] = useState('')
    const [loggingIn, setIsLoggingIn] = useState(false)
    const { setUser } = useContext(AuthContext)

    useEffect(() => {
        const path = window.location.toString().split('//')[1]
        const pathOrgSlug = path.split('.')[0]
        getOrgData(pathOrgSlug)
    }, [])

    const getOrgData = async (slug: string) => {
        const orgSlugResponse = await fetch(`${API_BASE_NAME}/public/organizations/${slug}`)
        const { orgName: fetchedOrgName, loginImageKey, id } = await orgSlugResponse.json()
        setOrgId(id)
        setOrgName(fetchedOrgName)
        setOrganizationLoginImageUrl(`https://s3.us-west-2.amazonaws.com/${loginImageKey}`)
    }

    const login = async (data: LoginFormInputs) => {
        setIsLoggingIn(true)
        const { username, password } = data
        setErrorMessage('')

        if (!username || !password) {
            setErrorMessage('Username and password are required.')
            return
        }

        try {
            const signInOutput = await signIn(data)
            const { nextStep } = signInOutput
            const { signInStep } = nextStep

            if (signInStep === "DONE") {
                const currentUser = await getCurrentUser()
                const session = await fetchAuthSession()
                const tokens = session.tokens
                if (tokens) {
                    const { idToken } = tokens
                    const sessionGroups = idToken?.payload["cognito:roles"]
                    const sessionGroupsArray = sessionGroups as Array<string>

                    const trimmedGroups: RiderTrackerRole[] = []

                    sessionGroupsArray.forEach((sg) => {
                        const trimmed = sg.split('/')[1]

                        if (isRiderTrackerRole(trimmed)) {
                            trimmedGroups.push(trimmed)
                        }
                    })

                    const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(trimmedGroups ?? [])
                    const userOrgIds: string | OrganizationType[] = await getOrganizationIdForUser(currentUser.username, heaviestRoleFromGroups)

                    if (Array.isArray(userOrgIds) && userOrgIds.some((o) => o.id === orgId)) {
                        setUser(currentUser)
                        console.log('login success')
                        return
                    }
                    
                    if (userOrgIds === orgId) {
                        setUser(currentUser)
                        console.log('login success')
                        return
                    }

                    signOut()
                    throw 'User does not have access to organization.'
                }
            }
        } catch (e) {
            console.error(e)
            signOut()
            setErrorMessage('Incorrect username or password.')
            setIsLoggingIn(false)
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
                            <TextField label='Email' {...register('username')} />
                            <TextField type='password' label='Password' {...register('password')} />
                        </Box>
                        <Typography sx={{ color: 'red' }}>{errorMessage ?? ' '}</Typography>
                        <Button type='submit' variant='contained' disabled={loggingIn} sx={{ mt: '2rem' }} fullWidth>Sign In</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm