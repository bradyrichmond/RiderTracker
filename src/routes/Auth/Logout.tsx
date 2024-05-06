import { Box, CircularProgress, Typography } from "@mui/material"
import { signOut } from "aws-amplify/auth"
import { useEffect } from "react"

const Logout = () => {
    useEffect(() => {
        signOut()
    }, [])

    return (
        <Box sx={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
            <Typography variant='h4'>Logging out...</Typography>
        </Box>
    )
}

export default Logout