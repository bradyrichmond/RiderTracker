import Auth from "@/routes/Auth"
import Logout from "@/routes/Auth/Logout"
import Unauthorized from "@/routes/Unauthorized"
import Onboarding from "@/routes/Unauthorized/Onboarding"
import { Typography } from "@mui/material"
import { createBrowserRouter } from "react-router-dom"

export const createUnauthorizedRouterObject = () => {
    return createBrowserRouter([{
        path: '/',
        element: <Unauthorized />,
        children: [
            {
                path: '/',
                element: <Typography>Landing</Typography>
            },
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