import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'

interface NavigationDrawerProps {
    toggleDrawer: () => void
    open: boolean
    navItems: NavItemType[]
}

export interface NavItemType {
    label: string
    path: string
    Icon?: ComponentType
}

const NavigationDrawer = ({ toggleDrawer, open, navItems }: NavigationDrawerProps) => {
    const navigate = useNavigate()
    return (
        <Drawer anchor='top' open={open}>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
                <List>
                    {navItems.map(({ label, Icon, path }) => (
                        <ListItem key={label} disablePadding>
                            <ListItemButton onClick={() => navigate(path)}>
                                {Icon ? 
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    :
                                    null
                                }
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default NavigationDrawer