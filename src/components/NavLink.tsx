import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PROTECTION } from '../constants/RouteProtection'
import { useUserStore } from '@/store/UserStore'

interface NavLinkProps {
    icon: ReactNode
    path: string
    label: string
}

const NavLink = ({ icon, path, label }: NavLinkProps) => {
    const { heaviestRole } = useUserStore()
    const routePermissions = ROUTE_PROTECTION.find((rp) => rp.name === heaviestRole)
    const routesForRole = routePermissions?.routes ?? []

    return (
        <>
            {routesForRole && routesForRole.includes(path) ?
                <Box display='flex' flexDirection='column'>
                    <Box justifyContent='center' alignItems='center'>
                        <Link to={path}>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                {icon}
                            </Box>
                            <Box>
                                <Typography>
                                    {label}
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                </Box>
                :
                null
            }
        </>
    )
}

export default NavLink