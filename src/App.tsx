import { withAuthenticator } from '@aws-amplify/ui-react'
import { fetchAuthSession, type AuthUser } from "aws-amplify/auth"
import { type UseAuthenticator } from "@aws-amplify/ui-react-core"
import '@aws-amplify/ui-react/styles.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Riders from './routes/Riders'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getBuses, getDrivers, getOrganizations, getRiders, getScans } from './API'
import Root from './routes/Root'
import Drivers from './routes/Drivers'
import Buses from './routes/Buses'
import ProtectedRoute from './routes/Protected/ProtectedRoute'
import Unauthorized from './routes/Protected/Unauthorized'
import { getHeaviestRole } from './helpers/GetHeaviestRole'
import './index.css'
import { Box } from '@mui/material'
import { RoleContext } from './contexts/RoleContext'
import Scans from './routes/Scans'
import Organizations from './routes/Organizations'

type AppProps = {
  signOut?: UseAuthenticator["signOut"]
  user?: AuthUser
}

function App({ user }: AppProps) {
  const [groups, setGroups] = useState<string[]>()
  const [token, setToken] = useState<string>()
  const [heaviestRole, setHeaviestRole] = useState<string>('RiderTracker_Guardian')

  const updateGroups = useCallback(async () => {
    const session = await fetchAuthSession()
    const idToken = session.tokens?.idToken
    const sessionGroups = idToken?.payload["cognito:roles"]
    const sessionGroupsArray = sessionGroups as Array<string>
    const trimmedGroups:string[] = []

    sessionGroupsArray.forEach((sg) => {
      trimmedGroups.push(sg.split('/')[1]);
    })

    setGroups(trimmedGroups)
    setToken(idToken?.toString() ?? '')
  }, [user])

  useEffect(() => {
    updateGroups()
  }, [updateGroups])

  useEffect(() => {
    if (groups) {
      const heaviestRoleFromGroups = getHeaviestRole(groups ?? [])
      setHeaviestRole(heaviestRoleFromGroups ?? '')
    }
  }, [groups])

  const router = useMemo(() => {
    return createBrowserRouter([{
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/buses',
          element: <ProtectedRoute route='/buses'><Buses /></ProtectedRoute>,
          loader: () => {
            return getBuses(token ?? '')
          }
        },
        {
          path: '/drivers',
          element: <ProtectedRoute route='/drivers'><Drivers /></ProtectedRoute>,
          loader: () => {
            return getDrivers(token ?? '')
          }
        },
        {
          path: '/organizations',
          element: <ProtectedRoute route='/organizations'><Organizations /></ProtectedRoute>,
          loader: () => {
            return getOrganizations(token ?? '')
          }
        },
        {
          path: '/riders',
          element: <ProtectedRoute route='/riders'><Riders /></ProtectedRoute>,
          loader: () => {
            return getRiders(token ?? '')
          }
        },
        {
          path: '/scans',
          element: <ProtectedRoute route='/scans'><Scans /></ProtectedRoute>,
          loader: () => {
            return getScans(token ?? '')
          }
        },
        {
          path: '/unauthorized',
          element: <Unauthorized />
        }
      ]
    }])
  }, [groups, heaviestRole])

  return (
    <Box height='100%'>
      <RoleContext.Provider value={{heaviestRole, setHeaviestRole}}>
        {router ? <RouterProvider router={router} /> : null}
      </RoleContext.Provider>
    </Box>
  )
}

export default withAuthenticator(App)
