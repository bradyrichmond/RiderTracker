import { Box, CircularProgress, Typography } from '@mui/material'
import { signOut } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/UserStore'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'

const Logout = () => {
    const { setUserId, setHeaviestRole } = useUserStore()
    const navigate = useNavigate()
    const { t } = useTranslation('common')

    useEffect(() => {
        const cleanup = Hub.listen('auth', ({ payload: { event } }) => {
            console.log(`root router heard ${event}`)
            if (event === 'signedOut') {
                setUserId('')
                setHeaviestRole(RIDER_TRACKER_ROLES.RIDER_TRACKER_UNAUTHENTICATED)
                navigate('/login')
            }
        })

        signOut()

        return () => {
            cleanup()
        }
    }, [navigate, setUserId, setHeaviestRole])

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
            <Typography variant='h4'>{t('loggingOut')}</Typography>
        </Box>
    )
}

export default Logout