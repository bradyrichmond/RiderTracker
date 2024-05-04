import Auth from "@/routes/Auth"
import Unauthorized from "@/routes/Unauthorized"
import Onboarding from "@/routes/Unauthorized/Onboarding"
import { Logout } from "@mui/icons-material"
import { createBrowserRouter } from "react-router-dom"

export const createUnauthorizedRouterObject = () => {
    return createBrowserRouter([{
        path: '/',
        element: <Unauthorized />,
        children: [
            {
                path: '/onboarding',
                element: <Onboarding />
            }
        ],
    },
    {
        path: '/logout',
        element: <Logout />
    },
    {
        path: '/login',
        element: <Auth />
    }
])}