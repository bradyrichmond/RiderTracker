import { PropsWithChildren, useContext } from "react"
import { Navigate } from "react-router-dom"
import { ROUTE_PROTECTION } from "@/constants/RouteProtection"
import { RoleContext } from "@/contexts/RoleContextProvider"

interface ProtectedRouteProps {
    route: string
}

const ProtectedRoute = ({ route, children }: PropsWithChildren<ProtectedRouteProps>) => {
    const { heaviestRole, userId } = useContext(RoleContext)
    const routePermissions = ROUTE_PROTECTION.find((rp) => rp.name === heaviestRole)

    const previousPath = location.pathname

    if (!userId) {
        return <Navigate to='/login' replace state={{ previousPath }} />
    }

    if (routePermissions && !routePermissions.routes.includes(route)) {
        return <Navigate to="/app/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute