import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { useUserStore } from '@/store/UserStore'
import { Box, LinearProgress } from '@mui/material'
import DriverHome from './DriverHome'
import { useEffect, useMemo } from 'react'

const Home = () => {
    const userType = useUserStore().userType
    const updateUserType = useUserStore().updateUserType

    const isLoading = useMemo(() => {
        console.log(`usertype is ${userType}`)
        return !userType
    }, [userType])

    useEffect(() => {
        if (!userType) {
            const load = setInterval(async () => {
                await updateUserType()
                return
            }, 1500)

            return () => {
                clearInterval(load)
            }
        }

        updateUserType()
    }, [updateUserType, userType])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
            {(!isLoading && userType && userType === RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER) &&
                <DriverHome />
            }
            {isLoading &&
                <Box width='50%'>
                    <LinearProgress />
                </Box>
            }
        </Box>
    )
}

export default Home