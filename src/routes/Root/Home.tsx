import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import { Box, Typography } from '@mui/material'
import DriverHome from './DriverHome'
import { useEffect } from 'react'

const Home = () => {
    const updateUserType = useUserStore().updateUserType
    const userType = useUserStore().userType

    useEffect(() => {
        updateUserType()
    }, [updateUserType])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
            <Box width='50%'>
                {userType && userType === RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER ?
                    <DriverHome />
                    :
                    <Typography variant='h3'>
                        You are logged in. There will be...........something here? Organization announcements? Snow route announcements? ??{userType}
                    </Typography>
                }
            </Box>
        </Box>
    )
}

export default Home