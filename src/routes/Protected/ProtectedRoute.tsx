import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTE_PROTECTION } from '@/constants/RouteProtection'
import Unauthorized from './Unauthorized'
import { useUserStore } from '@/store/UserStore'

interface ProtectedRouteProps {
    route: string
}

const ProtectedRoute = ({ route, children }: PropsWithChildren<ProtectedRouteProps>) => {
    const { heaviestRole, userId } = useUserStore()
    const routePermissions = ROUTE_PROTECTION.find((rp) => rp.name === heaviestRole)

    const previousPath = location.pathname

    if (!userId) {
        return <Navigate to='/login' replace state={{ previousPath }} />
    }

    if (routePermissions && !routePermissions.routes.includes(route)) {
        return <Unauthorized />
    }

    return children
}

export default ProtectedRoute