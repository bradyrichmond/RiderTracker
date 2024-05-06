import { Box, Container, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import NavigationContainer from "../../components/NavigationContainer"
import { useContext, useEffect } from "react"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { Hub } from "aws-amplify/utils"

const Root = () => {
    const { organizationOverride, setUserId } = useContext(RoleContext)
    const navigate = useNavigate()

    useEffect(() => {
        const cleanup = Hub.listen('auth', ({ payload: { event } }) => {
            console.log(`root router heard ${event}`)
            if (event === "signedOut") {
                setUserId('')
                navigate('/login')
            }
        })

        return () => {
            cleanup()
        }
    }, [])

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
            <Container sx={{mb: '2rem', flex: 1}}>
                <Outlet />
            </Container>
        </Box>
    )
}

export default Root