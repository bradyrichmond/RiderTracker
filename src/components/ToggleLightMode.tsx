import { ThemeContext } from "@/contexts/ThemeContextProvider"
import { useContext } from "react"
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Box, Typography } from "@mui/material"

const ToggleLightMode = () => {
    const themeContext = useContext(ThemeContext)

    return (
        <Box width='100%' display='flex' padding='1rem' onClick={themeContext.toggleColorMode} >
            <Box marginRight='1rem' display='flex' justifyContent='center' alignItems='center'>
                {themeContext.value === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </Box>
            <Box flex='1' display='flex' justifyContent='flex-start' alignItems='center'>
                <Typography textAlign="left">{themeContext.value === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</Typography>
            </Box>
        </Box>
    )
}

export default ToggleLightMode