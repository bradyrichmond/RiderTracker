import { Box, LinearProgress, Grid, useTheme, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import bg0 from './images/bg0.jpg'
import bg1 from './images/bg1.jpg'
import bg2 from './images/bg2.jpg'
import bg3 from './images/bg3.jpg'
import bg4 from './images/bg4.jpg'
import bg5 from './images/bg5.jpg'
import bg6 from './images/bg6.jpg'
import LoginForm from "./LoginForm"
import { AuthContext } from "@/contexts/AuthContextProvider"
import { getCurrentUser } from "@aws-amplify/auth"

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
    const { setUser } = useContext(AuthContext)
    const theme = useTheme()

    useEffect(() => {
        checkForLoggedInUser()
        const randomImageIndex = Math.floor(Math.random() * bgImages.length)
        setImage(bgImages[randomImageIndex])
        // magic number for preventing flash of login screen
        setTimeout(hideLoading, 2000)
    }, [])

    const hideLoading = () => {
        setIsLoading(false)
    }

    const checkForLoggedInUser = async () => {
        try {
            const currentUser = await getCurrentUser()

            if (currentUser.userId) {
                setUser(currentUser)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            {isLoading ?
                <>
                    <Box sx={{ ml: '5rem', mr: '5rem', mt: '2rem', mb: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='h4'>Gathering local data</Typography>
                    </Box>
                    <LinearProgress sx={{ height: '1rem', ml: '5rem', mr: '5rem', borderRadius: '1rem' }} />
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