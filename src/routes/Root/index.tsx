import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import BottomNav from "../../components/Navigation"

const Root = () => {
    return (
        <Box display='flex' flexDirection='column' height='100%'>
            <Box flex='1' display='flex' padding='2rem' width='100%' overflow='auto'>
                <Outlet />
            </Box>
            <Box>
                <BottomNav />
            </Box>
        </Box>
    )
}

export default Root