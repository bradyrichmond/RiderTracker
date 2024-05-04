import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavigationContainer from "../../components/NavigationContainer"

const Root = () => {
    return (
        <Box display='flex' flexDirection='column' height='100%' bgcolor='background.paper' color='text.primary' overflow='auto'>
            <Box>
                <NavigationContainer />
            </Box>
            <Container sx={{mb: '2rem', flex: 1}}>
                <Outlet />
            </Container>
        </Box>
    )
}

export default Root