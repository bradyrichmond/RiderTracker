import { createBrowserRouter, redirect } from 'react-router-dom'

import Bus from '@/routes/Buses/Bus'
import Buses from '@/routes/Buses'
import Home from '@/routes/Root/Home'
import Scans from '@/routes/Scans'
import ProtectedRoute from '@/routes/Protected/ProtectedRoute'
import Root from '@/routes/Root'
import Unauthorized from '@/routes/Protected/Unauthorized'
import Scan from '@/routes/Scans/Scan'
import Settings from '@/routes/Settings'
import Logout from '@/routes/Auth/Logout'
import Auth from '@/routes/Auth'
import Onboarding from '@/routes/Onboarding'
import { fetchAuthSession } from 'aws-amplify/auth'
import RouteStop from '@/routes/Routes/RouteStop'
import RoutesWrapper from '@/routes/Routes/RoutesWrapper'
import GuardianWrapper from '@/routes/Guardians/GuardianWrapper'
import RiderWrapper from '@/routes/Riders/RiderWrapper'
import SchoolWrapper from '@/routes/Schools/SchoolsWrapper'
import DriversWrapper from '@/routes/Drivers/DriversWrapper'
import Rider from '@/routes/Riders/Rider'
import Riders from '@/routes/Riders'
import Schools from '@/routes/Schools'
import School from '@/routes/Schools/School'

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
                        element: <ProtectedRoute route='/app/drivers'><DriversWrapper /></ProtectedRoute>
                    },
                    {
                        path: '/app/drivers/:id',
                        element: <ProtectedRoute route='/app/drivers/:id'><DriversWrapper /></ProtectedRoute>
                    },
                    {
                        path: '/app/guardians',
                        element: <ProtectedRoute route='/app/guardians'><GuardianWrapper /></ProtectedRoute>
                    },
                    {
                        path: '/app/guardians/:id',
                        element: <ProtectedRoute route='/app/guardians/:id'><GuardianWrapper /></ProtectedRoute>
                    },
                    {
                        path: '/app/settings',
                        element: <ProtectedRoute route='/app/settings'><Settings /></ProtectedRoute>
                    },
                    {
                        path: '/app/riders',
                        element: <ProtectedRoute route='/app/riders'><RiderWrapper><Riders /></RiderWrapper></ProtectedRoute>
                    },
                    {
                        path: '/app/riders/:id/detail',
                        element: <ProtectedRoute route='/app/riders/:id/detail'><RiderWrapper><Rider /></RiderWrapper></ProtectedRoute>
                    },
                    {
                        path: '/app/riders/:id',
                        element: <ProtectedRoute route='/app/riders/:id'><RiderWrapper><Riders /></RiderWrapper></ProtectedRoute>
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
                        element: <ProtectedRoute route='/app/schools'><SchoolWrapper><Schools /></SchoolWrapper></ProtectedRoute>
                    },
                    {
                        path: '/app/schools/:id/detail',
                        element: <ProtectedRoute route='/app/schools/:id/detail'><SchoolWrapper><School /></SchoolWrapper></ProtectedRoute>
                    },
                    {
                        path: '/app/schools/:id',
                        element: <ProtectedRoute route='/app/schools/:id'><SchoolWrapper><Schools /></SchoolWrapper></ProtectedRoute>
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