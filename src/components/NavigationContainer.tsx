import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import WorkIcon from '@mui/icons-material/Work'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import ArticleIcon from '@mui/icons-material/Article'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import PersonIcon from '@mui/icons-material/Person'
import NavigationDrawer, { NavItemType } from './NavigationDrawer'

{/* <NavLink path='/buses' icon={<DirectionsBusIcon />} label='Buses' /> */}
//                 <NavLink path='/drivers' icon={<WorkIcon />} label='Drivers' />
//                 <NavLink path='/guardians' icon={<PersonIcon />} label='Guardians' />
//                 <NavLink path='/organizations' icon={<CorporateFareIcon />} label='Organizations' />
//                 <NavLink path='/riders' icon={<ChildCareIcon />} label='Riders' />
//                 <NavLink path='/scans' icon={<ArticleIcon />} label='Scans' />

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
        <Box width='100%' padding='2rem' display='flex' flexDirection='row' justifyContent='flex-end'>
            <NavigationDrawer toggleDrawer={toggleDrawer} open={open} navItems={navItems} />
            <Button onClick={toggleDrawer}>
                <MenuIcon fontSize='large' />
            </Button>
        </Box>
    )
}

export default NavigationContainer