import { Box, LinearProgress, Grid, useTheme, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import bg0 from './images/bg0.jpg'
import bg1 from './images/bg1.jpg'
import bg2 from './images/bg2.jpg'
import bg3 from './images/bg3.jpg'
import bg4 from './images/bg4.jpg'
import bg5 from './images/bg5.jpg'
import bg6 from './images/bg6.jpg'
import LoginForm from './LoginForm'
import { fetchAuthSession } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'

const bgImages = [
    bg0,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6
]

const Auth = () => {
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const theme = useTheme()
    const { setUserId, updateUserData } = useUserStore()
    const navigate = useNavigate()
    const { t } = useTranslation('auth')

    useEffect(() => {
        const checkForLoggedInUser = async () => {
            const session = await fetchAuthSession()
            if (session?.userSub) {
                setUserId(session.userSub)
                updateUserData()
                const previousPath = history.state?.usr?.previousPath

                if (previousPath && previousPath !== location.pathname) {
                    console.log(`redirecting from ${location.pathname} to ${previousPath}`)
                    navigate(previousPath)
                }
            }
        }

        const randomImageIndex = Math.floor(Math.random() * bgImages.length)
        setImage(bgImages[randomImageIndex])
        checkForLoggedInUser()
        // magic number for preventing flash of login screen
        setTimeout(hideLoading, 2000)
    }, [navigate, setUserId, updateUserData])

    const hideLoading = () => {
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ?
                <>
                    <Box sx={{ ml: 10, mr: 10, mt: 4, mb: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='h4'>{t('gatheringLocalData')}</Typography>
                    </Box>
                    <LinearProgress sx={{ height: 2, ml: 10, mr: 10, borderRadius: 2 }} />
                </>
                :
                <Grid container spacing={0} sx={{ height: '100%' }}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ backgroundImage: `url("${image}")`, backgroundSize: 'cover', backgroundAttachment: 'center', height: '100%', width: '100%' }} />
                    </Grid>
                    <Grid item xs={0} md={4} sx={{ height: '100%', backgroundColor: theme.palette.background.default }}>
                        <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <LoginForm />
                        </Box>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default Auth