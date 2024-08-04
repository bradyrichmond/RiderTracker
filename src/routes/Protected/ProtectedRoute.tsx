import { PropsWithChildren } from 'react'
import Unauthorized from './Unauthorized'
import { useUserStore } from '@/store/UserStore'

interface ProtectedRouteProps {
    route: string
}

const ProtectedRoute = ({ children, route }: PropsWithChildren<ProtectedRouteProps>) => {
    const routePermissions = useUserStore().routePermissions

    if (routePermissions && !routePermissions.routes.includes(route)) {
        return <Unauthorized />
    }

    return children
}

export default ProtectedRoute