import { Box } from '@mui/material'
import { ComponentType, useState } from 'react'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import WorkIcon from '@mui/icons-material/Work'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import ArticleIcon from '@mui/icons-material/Article'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import PersonIcon from '@mui/icons-material/Person'
import NavigationDrawer from './NavigationDrawer'
import ResponsiveAppBar from './ResponsiveAppBar'

export interface NavItemType {
    label: string
    path: string
    Icon: ComponentType
}

const navItems: NavItemType[] = [
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

const NavigationContainer = () => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        setOpen((c) => !c)
    }

    return (
        <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end'>
            <NavigationDrawer toggleDrawer={toggleDrawer} open={open} navItems={navItems} />
            <ResponsiveAppBar />
            {/* <Button onClick={toggleDrawer}>
                <MenuIcon fontSize='large' />
            </Button> */}
        </Box>
    )
}

export default NavigationContainer