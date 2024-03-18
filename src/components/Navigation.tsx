import Box from '@mui/material/Box';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import WorkIcon from '@mui/icons-material/Work';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import NavLink from './NavLink';

const BottomNav = () => {
    return (
        <Box width='100%' sx={{background: '#fff'}}>
            <Box padding='2rem' display='flex' flexDirection='row' justifyContent='space-evenly'>
                <NavLink path='/buses' icon={<DirectionsBusIcon />} label='Buses' />
                <NavLink path='/drivers' icon={<WorkIcon />} label='Drivers' />
                <NavLink path='/riders' icon={<ChildCareIcon />} label='Riders' />
            </Box>
        </Box>
    );
}

export default BottomNav