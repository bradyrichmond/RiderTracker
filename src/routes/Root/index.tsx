import { Box, Container, LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavigationContainer from '@/components/NavigationContainer'
import { useUserStore } from '@/store/UserStore'
import { useState, useEffect, useCallback } from 'react'
import { Hub } from 'aws-amplify/utils'
import { useOrgStore } from '@/store/OrgStore'

const Root = () => {
    const [isInitialized, setIsInitialized] = useState<boolean>(false)
    const updateUserData = useUserStore().updateUserData
    const updateOrgData = useOrgStore().updateOrgData

    const initialize = useCallback(async () => {
        await updateUserData()
        await updateOrgData()
        setIsInitialized(true)
    }, [updateOrgData, updateUserData])

    useEffect(() => {
        initialize()

        const cleanup = Hub.listen('auth', ({ payload: { event } }) => {
            console.log(`Auth listener heard ${event}`)

            switch (event) {
                case 'signedIn':
                    initialize()
                    break
                default:
                    console.log('Auth listener event complete', `Event: ${JSON.stringify(event)}`)
            }
        })

        return () => {
            cleanup()
        }
    }, [initialize])

    return (
        <Box display='flex' flexDirection='column' height='100%' bgcolor='background.paper' color='text.primary' overflow='auto'>
            <Box>
                <NavigationContainer />
            </Box>
            <Container sx={{ mb: 4, flex: 1 }}>
                {isInitialized ?
                    <Outlet />
                    :
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ height: 2, borderRadius: 2 }} />
                        </Box>
                    </Box>
                }
            </Container>
        </Box>
    )
}

export default Root