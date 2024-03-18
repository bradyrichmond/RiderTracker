import { PropsWithChildren, useContext } from "react"
import { Navigate } from "react-router-dom"
import { ROUTE_PROTECTION } from "../../constants/RouteProtection"
import { RoleContext } from "../../contexts/RoleContext"

interface ProtectedRouteProps {
    route: string
}

const ProtectedRoute = ({ route, children }: PropsWithChildren<ProtectedRouteProps>) => {
    const roleContext = useContext(RoleContext)
    const role = roleContext.heaviestRole
    const routePermissions = ROUTE_PROTECTION.find((rp) => rp.name === role)

    if (routePermissions && !routePermissions.routes.includes(route)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute