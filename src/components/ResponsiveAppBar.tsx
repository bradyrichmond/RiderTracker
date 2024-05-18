import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { ComponentType, MouseEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleContext } from '../contexts/RoleContextProvider'
import { ROUTE_PROTECTION, SettingsItemType } from '../constants/RouteProtection'
import { useTheme } from '@mui/material'
import { NavItemType } from './NavigationContainer'


interface MenuItemWithIconProps {
    Icon: ComponentType
    label: string
    color: string
}

export const MenuItemWithIcon = ({ Icon, label, color }: MenuItemWithIconProps) => {
    return (
        <Box width='100%' display='flex' padding='1rem' color={color}>
            <Box marginRight='1rem' display='flex' justifyContent='center' alignItems='center'>
                <Icon />
            </Box>
            <Box flex='1' display='flex' justifyContent='flex-start' alignItems='center'>
                <Typography textAlign="left">{label}</Typography>
            </Box>
        </Box>
    )
}

const ResponsiveAppBar = () => {
    const theme = useTheme()

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    const { userFullName, userPictureUrl, heaviestRole, userId } = useContext(RoleContext)
    const routeProtection = ROUTE_PROTECTION.find((r) => r.name === heaviestRole)
    const pages: NavItemType[] = routeProtection?.navItems ?? []
    const settings: SettingsItemType[] = routeProtection?.settingsItems ?? []

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none'
                            }}
                            onClick={() => navigate('/app')}
                        >
                            RiderTracker
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}

                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map(({ label, path, Icon }) => (
                                    <MenuItem key={label} onClick={() => {
                                        navigate(path)
                                        handleCloseNavMenu()
                                    }}>
                                        <MenuItemWithIcon label={label} Icon={Icon} color={theme.palette.primary.contrastText} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                            onClick={() => navigate('/app')}
                        >
                            RiderTracker
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map(({ label, path, Icon }) => (
                                <Button
                                    key={label}
                                    onClick={() => {
                                        navigate(path)
                                        handleCloseNavMenu()
                                    }}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    <MenuItemWithIcon label={label} Icon={Icon} color={theme.palette.primary.contrastText} />
                                </Button>
                            ))}
                        </Box>

                        {userId ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={'Open settings'}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={userFullName} src={userPictureUrl} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map(({ label, action, Component, path, Icon }) => {
                                        return Component ?
                                            <Component key={label} />
                                            :
                                            <MenuItem key={label} onClick={action ? action : () => navigate(path)}>
                                                <MenuItemWithIcon label={label} Icon={Icon} color={theme.palette.text.primary} />
                                            </MenuItem>
                                        }
                                    )}
                                </Menu>
                            </Box>
                            :
                            null
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            {/* vvvvv MUI recommended hack for fixed position appbars vvvvv */}
            <Box sx={{ padding: { s: '0', md: '2rem' } }}>
                <Toolbar />
            </Box>
        </>
    )
}

export default ResponsiveAppBar
