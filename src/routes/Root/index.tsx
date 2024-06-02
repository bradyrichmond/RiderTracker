import { Box, Container, LinearProgress, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavigationContainer from '@/components/NavigationContainer'
import { useOrgStore } from '@/store/OrgStore'
import { useApiStore } from '@/store/ApiStore'
import { useUserStore } from '@/store/UserStore'
import { useState, useEffect, useCallback } from 'react'
import { Hub } from 'aws-amplify/utils'

const Root = () => {
    const [isInitialized, setIsInitialized] = useState<boolean>(false)
    const { updateUserData, updateUserPictureUrl, userId } = useUserStore()
    const getApi = useApiStore().getApi
    const { updateOrgData, organizationOverride, orgId } = useOrgStore()

    const initialize = useCallback(async () => {
        await getApi()
        await updateUserData()
        await updateOrgData()
        setIsInitialized(true)
    }, [getApi, updateUserData, updateOrgData])

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

    useEffect(() => {
        if (userId && orgId) {
            updateUserPictureUrl()
        }
    }, [userId, orgId, updateUserPictureUrl])

    return (
        <Box display='flex' flexDirection='column' height='100%' bgcolor='background.paper' color='text.primary' overflow='auto'>
            <Box>
                <NavigationContainer />
            </Box>
            {organizationOverride ?
                <Box sx={{
                    width: '100%',
                    padding: '2rem',
                    background: '#ff0000',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant='h5'>
                        You are currently operating as a manually selected organization.
                    </Typography>
                </Box>
                :
                null
            }
            <Container sx={{ mb: '2rem', flex: 1 }}>
                {isInitialized ?
                    <Outlet />
                    :
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ height: '1rem', borderRadius: '1rem' }} />
                        </Box>
                    </Box>
                }
            </Container>
        </Box>
    )
}

export default Root