import { Box } from '@mui/material'
import { ComponentType } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'

export interface NavItemType {
    label: string
    path: string
    Icon: ComponentType
}

const NavigationContainer = () => {
    return (
        <Box width='100%' display='flex' flexDirection='row' justifyContent='flex-end'>
            <ResponsiveAppBar />
        </Box>
    )
}

export default NavigationContainer