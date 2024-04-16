import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavigationContainer from "../../components/NavigationContainer"

const Root = () => {
    return (
        <Box display='flex' flexDirection='column' height='100%' bgcolor='background.paper' color='text.primary'>
            <Box>
                <NavigationContainer />
            </Box>
            <Container sx={{mb: '2rem', height: '100%'}}>
                <Box height='100%' sx={{overflow: 'auto'}}>
                    <Outlet />
                </Box>
            </Container>
        </Box>
    )
}

export default Root