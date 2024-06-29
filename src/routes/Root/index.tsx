import { Box, Container, LinearProgress, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavigationContainer from '@/components/NavigationContainer'
import { useOrgStore } from '@/store/OrgStore'
import { useApiStore } from '@/store/ApiStore'
import { useState, useEffect, useCallback } from 'react'
import { Hub } from 'aws-amplify/utils'

const Root = () => {
    const [isInitialized, setIsInitialized] = useState<boolean>(false)
    const getClient = useApiStore().getClient
    const { updateOrgData, organizationOverride } = useOrgStore()

    const initialize = useCallback(async () => {
        await getClient()
        await updateOrgData()
        setIsInitialized(true)
    }, [getClient, updateOrgData])

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
            {organizationOverride ?
                <Box sx={{
                    width: '100%',
                    padding: 4,
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