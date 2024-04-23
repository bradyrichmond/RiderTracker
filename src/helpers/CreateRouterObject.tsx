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
import Scan from "@/routes/Scans/Scan"
import Stops from "@/routes/Stops"
import Stop from "@/routes/Stops/Stop"
import Schools from "@/routes/Schools"
import School from "@/routes/Schools/School"
import Settings from "@/routes/Settings"

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
                path: '/settings',
                element: <ProtectedRoute route='/settings'><Settings /></ProtectedRoute>
            
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
                path: '/scans/:id',
                element: <ProtectedRoute route='/scans/:id'><Scan /></ProtectedRoute>
            
            },
            {
                path: '/schools',
                element: <ProtectedRoute route='/schools'><Schools /></ProtectedRoute>
            
            },
            {
                path: '/schools/:id',
                element: <ProtectedRoute route='/schools/:id'><School /></ProtectedRoute>
            
            },
            {
                path: '/stops',
                element: <ProtectedRoute route='/stops'><Stops /></ProtectedRoute>
            
            },
            {
                path: '/stops/:id',
                element: <ProtectedRoute route='/stops/:id'><Stop /></ProtectedRoute>
            
            },
            {
                path: '/unauthorized',
                element: <Unauthorized />
            }
        ]
    }])
}