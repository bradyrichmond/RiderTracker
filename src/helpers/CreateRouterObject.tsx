import { createBrowserRouter } from "react-router-dom"

import Bus from '@/routes/Buses/Bus'
import Buses from '@/routes/Buses'
import Driver from '@/routes/Drivers/Driver'
import Drivers from '@/routes/Drivers'
import Guardian from '@/routes/Guardians/Guardian'
import Guardians from '@/routes/Guardians'
import Home from '@/routes/Root/Home'
import Scans from '@/routes/Scans'
import MyRiders from '@/routes/Riders/MyRiders'
import Organization from '@/routes/Organizations/Organization'
import Organizations from '@/routes/Organizations'
import ProtectedRoute from '@/routes/Protected/ProtectedRoute'
import Rider from '@/routes/Riders/Rider'
import Riders from '@/routes/Riders'
import Root from '@/routes/Root'
import Unauthorized from '@/routes/Protected/Unauthorized'

export const createRouterObject = () => {
    return createBrowserRouter([{
        path: '/',
        element: <Root />,
        children: 
        [
            {
                path: '/',
                element: <ProtectedRoute route='/'><Home /></ProtectedRoute>
            },
            {
                path: '/buses',
                element: <ProtectedRoute route='/buses'><Buses /></ProtectedRoute>
            },
            {
                path: '/buses/:id',
                element: <ProtectedRoute route='/buses/:id'><Bus /></ProtectedRoute>
            },
            {
                path: '/drivers',
                element: <ProtectedRoute route='/drivers'><Drivers /></ProtectedRoute>
            },
            {
                path: '/drivers/:id',
                element: <ProtectedRoute route='/drivers/:id'><Driver /></ProtectedRoute>
            },
            {
                path: '/guardians',
                element: <ProtectedRoute route='/guardians'><Guardians /></ProtectedRoute>
            },
            {
                path: '/guardians/:id',
                element: <ProtectedRoute route='/guardians/:id'><Guardian /></ProtectedRoute>
            },
            {
                path: '/my-riders',
                element: <ProtectedRoute route='/my-riders'><MyRiders /></ProtectedRoute>
            },
            {
                path: '/organizations',
                element: <ProtectedRoute route='/organizations'><Organizations /></ProtectedRoute>
            
            },
            {
                path: '/organizations/:id',
                element: <ProtectedRoute route='/organizations/:id'><Organization /></ProtectedRoute>
            
            },
            {
                path: '/organizations/:id/buses',
                element: <ProtectedRoute route='/organizations/:id/buses'><Buses /></ProtectedRoute>
            
            },
            {
                path: '/riders',
                element: <ProtectedRoute route='/riders'><Riders /></ProtectedRoute>
            
            },
            {
                path: '/riders/:id',
                element: <ProtectedRoute route='/riders/:id'><Rider /></ProtectedRoute>
            
            },
            {
                path: '/scans',
                element: <ProtectedRoute route='/scans'><Scans /></ProtectedRoute>
            
            },
            {
                path: '/unauthorized',
                element: <Unauthorized />
            }
        ]
    }])
}