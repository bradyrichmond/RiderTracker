import { ThemeContext } from '@/contexts/ThemeContextProvider'
import { useContext } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { MenuItem, useTheme } from '@mui/material'
import { MenuItemWithIcon } from './ResponsiveAppBar'

const ToggleLightMode = () => {
    const themeContext = useContext(ThemeContext)
    const theme = useTheme()

    return (
        <MenuItem onClick={themeContext.toggleColorMode}>
            <MenuItemWithIcon Icon={themeContext.mode === 'light' ? DarkModeIcon : LightModeIcon} label={themeContext.mode === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'} color={theme.palette.text.primary} />
        </MenuItem>
    )
}

export default ToggleLightMode