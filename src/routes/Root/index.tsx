import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const Root = () => {
    return (
        <Box><Outlet /></Box>
    )
}

export default Root