import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { ROUTE_PROTECTION } from "../../constants/RouteProtection"

interface ProtectedRouteProps {
    role: string
    route: string
}

const ProtectedRoute = ({ role, route, children }: PropsWithChildren<ProtectedRouteProps>) => {
    const routePermissions = ROUTE_PROTECTION.find((rp) => rp.name === role);

    if (routePermissions && (routePermissions.routes.includes(route) || routePermissions?.routes.includes("*"))) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute