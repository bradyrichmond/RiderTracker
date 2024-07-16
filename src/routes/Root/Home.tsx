import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

const Home = () => {
    const updateUserData = useUserStore().updateUserData
    const currentUser = useUserStore().currentUser
    const updateOrgData = useOrgStore().updateOrgData
    const orgData = useOrgStore().orgData

    useEffect(() => {
        updateUserData()
        updateOrgData()
    }, [updateUserData, updateOrgData])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='100%' flexDirection='column'>
            <Typography>Here is home</Typography>
            <Box padding={2} marginTop={2} border='2px solid white'>
                <Typography>User: {JSON.stringify(currentUser)}</Typography>
            </Box>
            <Box padding={2} marginTop={2} border='2px solid white'>
                <Typography>Org: {JSON.stringify(orgData)}</Typography>
            </Box>
        </Box>
    )
}

export default Home