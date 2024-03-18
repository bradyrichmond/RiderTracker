import './App.css'
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
import { getBuses, getDrivers, getRiders } from './API'
import Root from './routes/Root'
import Drivers from './routes/Drivers'
import Buses from './routes/Buses'
import ProtectedRoute from './routes/Protected/ProtectedRoute'
import Unauthorized from './routes/Protected/Unauthorized'
import { getHeaviestRole } from './helpers/GetHeaviestRole'

type AppProps = {
  signOut?: UseAuthenticator["signOut"]
  user?: AuthUser
};

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
          element: <ProtectedRoute role={heaviestRole} route='/buses'><Buses /></ProtectedRoute>,
          loader: () => {
            return getBuses(token ?? '')
          }
        },
        {
          path: '/drivers',
          element: <ProtectedRoute role={heaviestRole} route='/drivers'><Drivers /></ProtectedRoute>,
          loader: () => {
            return getDrivers(token ?? '')
          }
        },
        {
          path: '/riders',
          element: <ProtectedRoute role={heaviestRole} route='/riders'><Riders /></ProtectedRoute>,
          loader: () => {
            return getRiders(token ?? '')
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
    <div>
      {router ? <RouterProvider router={router} /> : null}
    </div>
  )
}

export default withAuthenticator(App)
