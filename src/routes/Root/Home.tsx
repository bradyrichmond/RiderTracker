import { useUserStore } from '@/store/UserStore'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

const Home = () => {
    const getUsers = useUserStore().getUsers

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
            <Typography>Here is home</Typography>
        </Box>
    )
}

export default Home