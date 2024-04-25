import { Box, Button, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { signIn, getCurrentUser } from '@aws-amplify/auth'
import { AuthContext } from "@/contexts/AuthContextProvider"
import { API_BASE_NAME } from "@/API"

interface LoginFormInputs {
    username: string
    password: string
}

const LoginForm = () => {
    const { handleSubmit, register } = useForm<LoginFormInputs>()
    const [orgImage, setOrgImage] = useState('')
    const [orgName, setOrgName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loggingIn, setIsLoggingIn] = useState(false)
    const { setUser } = useContext(AuthContext)

    useEffect(() => {
        const path = window.location.toString().split('//')[1]
        const pathOrgSlug = path.split('.')[0]
        getOrgData(pathOrgSlug)
    }, [])

    const getOrgData = async (slug: string) => {
        const orgSlugResponse = await fetch(`${API_BASE_NAME}/public/organizations/${slug}`)
        const { orgName: fetchedOrgName } = await orgSlugResponse.json()
        setOrgName(fetchedOrgName)
        setOrgImage('')
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
                setUser(currentUser)
            }
        } catch (e) {
            console.error(e)
            setErrorMessage('Incorrect username or password.')
            setIsLoggingIn(false)
        }
    }

    return (
        <Box sx={{ flex: 1 }}>
            <Box sx={{ pl: '2rem', pr: '2rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {orgImage ? 
                        <img src={orgImage} alt={`${orgName}`}/>
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