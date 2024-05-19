import { Box } from '@mui/material'
import ResponsiveAppBar from './ResponsiveAppBar'

const NavigationContainer = () => {
    return (
        <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end'>
            <ResponsiveAppBar />
        </Box>
    )
}

export default NavigationContainer