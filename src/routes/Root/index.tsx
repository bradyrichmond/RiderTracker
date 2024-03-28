import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavigationContainer from "../../components/NavigationContainer"

const Root = () => {
    return (
        <Box display='flex' flexDirection='column' height='100%'>
            <Box>
                <NavigationContainer />
            </Box>
            <Box flex='1' display='flex' padding='2rem' width='100%' overflow='auto'>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Root