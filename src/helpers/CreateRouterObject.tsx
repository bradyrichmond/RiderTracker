import { createBrowserRouter, redirect } from 'react-router-dom'

import Bus from '@/routes/Buses/Bus'
import Buses from '@/routes/Buses'
import Driver from '@/routes/Drivers/Driver'
import Drivers from '@/routes/Drivers'
import Guardian from '@/routes/Guardians/Guardian'
import Guardians from '@/routes/Guardians'
import Home from '@/routes/Root/Home'
import Scans from '@/routes/Scans'
import ProtectedRoute from '@/routes/Protected/ProtectedRoute'
import Rider from '@/routes/Riders/Rider'
import Riders from '@/routes/Riders'
import Root from '@/routes/Root'
import Unauthorized from '@/routes/Protected/Unauthorized'
import Scan from '@/routes/Scans/Scan'
import Schools from '@/routes/Schools'
import School from '@/routes/Schools/School'
import Settings from '@/routes/Settings'
import Logout from '@/routes/Auth/Logout'
import Auth from '@/routes/Auth'
import Onboarding from '@/routes/Onboarding'
import { fetchAuthSession } from 'aws-amplify/auth'
import RouteStop from '@/routes/Routes/RouteStop'
import RoutesWrapper from '@/routes/Routes/RoutesWrapper'

export const createRouterObject = () => {
    return createBrowserRouter([{
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/app',
                children: [
                    {
                        path: '/app',
                        element: <ProtectedRoute route='/app'><Home /></ProtectedRoute>
                    },
                    {
                        path: '/app/buses',
                        element: <ProtectedRoute route='/app/buses'><Buses /></ProtectedRoute>
                    },
                    {
                        path: '/app/buses/:id',
                        element: <ProtectedRoute route='/app/buses/:id'><Bus /></ProtectedRoute>
                    },
                    {
                        path: '/app/drivers',
                        element: <ProtectedRoute route='/app/drivers'><Drivers /></ProtectedRoute>
                    },
                    {
                        path: '/app/drivers/:id',
                        element: <ProtectedRoute route='/app/drivers/:id'><Driver /></ProtectedRoute>
                    },
                    {
                        path: '/app/guardians',
                        element: <ProtectedRoute route='/app/guardians'><Guardians /></ProtectedRoute>
                    },
                    {
                        path: '/app/guardians/:id',
                        element: <ProtectedRoute route='/app/guardians/:id'><Guardian /></ProtectedRoute>
                    },
                    {
                        path: '/app/settings',
                        element: <ProtectedRoute route='/app/settings'><Settings /></ProtectedRoute>
                    },
                    {
                        path: '/app/riders',
                        element: <ProtectedRoute route='/app/riders'><Riders /></ProtectedRoute>
                    },
                    {
                        path: '/app/riders/:id',
                        element: <ProtectedRoute route='/app/riders/:id'><Rider /></ProtectedRoute>
                    },
                    {
                        path: '/app/routes',
                        element: <ProtectedRoute route='/app/routes'><RoutesWrapper /></ProtectedRoute>
                    },
                    {
                        path: '/app/routes/:id',
                        element: <ProtectedRoute route='/app/routes/:id'><RoutesWrapper /></ProtectedRoute>
                    },
                    {
                        path: '/app/scans',
                        element: <ProtectedRoute route='/app/scans'><Scans /></ProtectedRoute>
                    },
                    {
                        path: '/app/scans/:id',
                        element: <ProtectedRoute route='/app/scans/:id'><Scan /></ProtectedRoute>
                    },
                    {
                        path: '/app/stops/:stopId',
                        element: <ProtectedRoute route='/app/stops/:stopId'><RouteStop /></ProtectedRoute>
                    },
                    {
                        path: '/app/schools',
                        element: <ProtectedRoute route='/app/schools'><Schools /></ProtectedRoute>
                    },
                    {
                        path: '/app/schools/:id',
                        element: <ProtectedRoute route='/app/schools/:id'><School /></ProtectedRoute>
                    },
                    {
                        path: '/app/unauthorized',
                        element: <Unauthorized />
                    }
                ]
            },
            {
                path: '/onboarding',
                element: <Onboarding />
            }
        ]
    },
    {
        path: '/login',
        element: <Auth />
    },
    {
        path: '/logout',
        element: <Logout />
    },
    {
        path: '*',
        loader: async () => {
            const session = await fetchAuthSession()

            if (session.userSub) {
                console.log(`redirecting from ${location.pathname} to /`)
                return redirect('/')
            } else {
                console.log(`redirecting from ${location.pathname} to /login`)
                return redirect('/login')
            }
        }
    }
    ])
}