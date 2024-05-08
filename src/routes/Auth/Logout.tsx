import { RoleContext } from "@/contexts/RoleContextProvider"
import { Box, CircularProgress, Typography } from "@mui/material"
import { signOut } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const { setUserId } = useContext(RoleContext)
    const navigate = useNavigate()

    useEffect(() => {
        const cleanup = Hub.listen('auth', ({ payload: { event } }) => {
            console.log(`root router heard ${event}`)
            if (event === "signedOut") {
                setUserId('')
                navigate('/login')
            }
        })

        signOut()

        return () => {
            cleanup()
        }
    }, [])

    return (
        <Box sx={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
            <Typography variant='h4'>Logging out...</Typography>
        </Box>
    )
}

export default Logout