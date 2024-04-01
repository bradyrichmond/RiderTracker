import { AuthUser, fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth"
import ProtectedRoute from "../Protected/ProtectedRoute"
import Root from "."
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import Scans from '../Scans'
import Organizations from '../Organizations'
import Guardians from '../Guardians'
import Bus from '../Buses/Bus'
import Buses from '../Buses'
import Driver from '../Drivers/Driver'
import Drivers from '../Drivers'
import Guardian from '../Guardians/Guardian'
import Organization from '../Organizations/Organization'
import Rider from '../Riders/Rider'
import Riders from '../Riders'
import Home from './Home'
import MyRiders from '../Riders/MyRiders'
import { getHeaviestRole } from "../../helpers/GetHeaviestRole"
import Unauthorized from "../Protected/Unauthorized"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { RiderTrackerAPI } from "../../API"
import { RiderTrackerRole, isRiderTrackerRole } from "../../constants/Roles"
import { ApiContext } from "../../contexts/ApiContextProvider"

interface RootRouterProps {
    user: AuthUser
}

const RootRouter = ({ user }: RootRouterProps) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const { userFullName, setUserFullName, heaviestRole, setHeaviestRole, setUserPictureUrl } = useContext(RoleContext)
    const { setApi } = useContext(ApiContext)

    const initialize = useCallback(async () => {
        const session = await fetchAuthSession()
        const idToken = session.tokens?.idToken
        const sessionGroups = idToken?.payload["cognito:roles"]
        const sessionGroupsArray = sessionGroups as Array<string>
        const trimmedGroups: RiderTrackerRole[] = []

        sessionGroupsArray.forEach((sg) => {
            const trimmed = sg.split('/')[1]
            if (isRiderTrackerRole(trimmed)) {
                trimmedGroups.push(trimmed)
            }
        })

        const heaviestRoleFromGroups: RiderTrackerRole = getHeaviestRole(trimmedGroups ?? [])
        setHeaviestRole(heaviestRoleFromGroups)

        initializeApi(idToken?.toString() ?? '')
        await initializeUserData()
        setIsInitialized(true)
    }, [user])

    useEffect(() => {
        initialize()
    }, [initialize])
    
    const initializeApi = (token: string) => {
        const apiInstance = new RiderTrackerAPI(token)
        setApi(apiInstance)
    }

    const initializeUserData = async () => {
        try {
            const userAttributes = await fetchUserAttributes();
            const { given_name, family_name, picture } = userAttributes
            setUserFullName(`${given_name} ${family_name}`)

            if (picture) {
                setUserPictureUrl(picture)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const router = useMemo(() => {
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
                    element: <ProtectedRoute route='/organizations/:id/buses'><Buses fetchForOrg /></ProtectedRoute>
                
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
    }, [heaviestRole])

    return (
        <>
            {isInitialized ? <RouterProvider router={router} /> : null}
        </>
    )
}

export default RootRouter