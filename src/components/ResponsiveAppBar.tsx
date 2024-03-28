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
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import WorkIcon from '@mui/icons-material/Work'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import ArticleIcon from '@mui/icons-material/Article'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import PersonIcon from '@mui/icons-material/Person'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { ComponentType, MouseEvent, useState } from 'react'
import { NavItemType } from './NavigationDrawer'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'aws-amplify/auth'

interface SettingNavItemType extends NavItemType {
    action?(): Promise<void>
}

const pages: NavItemType[] = [
    {
        path: '/buses',
        label: 'Buses',
        Icon: DirectionsBusIcon
    },
    {
        path: '/drivers',
        label: 'Drivers',
        Icon: WorkIcon
    },
    {
        path: '/guardians',
        label: 'Guardians',
        Icon: PersonIcon
    },
    {
        path: '/organizations',
        label: 'Organizations',
        Icon: CorporateFareIcon
    },
    {
        path: '/riders',
        label: 'Riders',
        Icon: ChildCareIcon
    },
    {
        path: '/scans',
        label: 'Scans',
        Icon: ArticleIcon
    },
]

const settings: SettingNavItemType[] = [
    {
        action: signOut,
        label: 'Sign Out',
        Icon: PowerSettingsNewIcon,
        path: ''
    }
]

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
                            textDecoration: 'none',
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
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                {settings.map(({ label, action, path, Icon }) => (
                                    <MenuItem key={label} onClick={action ? action : () => navigate(path)}>
                                        <MenuItemWithIcon label={label} Icon={Icon} />
                                    </MenuItem>
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
