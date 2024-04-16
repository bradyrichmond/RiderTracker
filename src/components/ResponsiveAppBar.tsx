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
import { ComponentType, MouseEvent, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleContext } from '../contexts/RoleContextProvider'
import { ROUTE_PROTECTION } from '../constants/RouteProtection'

interface MenuItemWithIconProps {
    Icon: ComponentType
    label: string
}

const MenuItemWithIcon = ({ Icon, label }: MenuItemWithIconProps) => {
    return (
        <Box width='100%' display='flex' padding='1rem' >
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
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    const roleContext = useContext(RoleContext)
    const routeProtection = ROUTE_PROTECTION.find((r) => r.name === roleContext.heaviestRole)
    const pages = routeProtection?.navItems ?? []
    const settings = routeProtection?.settingsItems ?? []
    const nameAbbrev = useMemo(() => {
        if (roleContext.userFullName) {
            const split = roleContext.userFullName.split(' ')
            const resultArr = []
            for (let splitItem of split) {
                resultArr.push(splitItem[0])
            }
            return resultArr.join('')
        }
    }, [roleContext.userFullName])

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
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                            onClick={() => navigate('/')}
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
                                color="inherit"
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
                                {pages.map(({label, path, Icon}) => (
                                    <MenuItem key={label} onClick={() => {
                                        navigate(path)
                                        handleCloseNavMenu()
                                    }}>
                                        <MenuItemWithIcon label={label} Icon={Icon} />
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
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => navigate('/')}
                        >
                            RiderTracker
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map(({label, path, Icon}) => (
                                <Button
                                    key={label}
                                    onClick={() => {
                                        navigate(path)
                                        handleCloseNavMenu()
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <MenuItemWithIcon label={label} Icon={Icon} />
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={roleContext.userFullName}>{nameAbbrev}</Avatar>
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
                                {settings.map(({ label, action, Component, path, Icon }) => (
                                    <>
                                        {Component ? 
                                            <Component />
                                            :
                                            <MenuItem key={label} onClick={action ? action : () => navigate(path)}>
                                                <MenuItemWithIcon label={label} Icon={Icon} />
                                            </MenuItem>
                                        }
                                    </>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* vvvvv MUI recommended hack for fixed position appbars vvvvv */}
            <Box sx={{ padding: { s: '0', md: '2rem'} }}>
                <Toolbar />
            </Box>
        </>
    )
}

export default ResponsiveAppBar
