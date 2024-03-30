import { withAuthenticator } from '@aws-amplify/ui-react'
import { fetchAuthSession, fetchUserAttributes, type AuthUser } from "aws-amplify/auth"
import { type UseAuthenticator } from "@aws-amplify/ui-react-core"
import '@aws-amplify/ui-react/styles.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Riders from './routes/Riders'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import Guardians from './routes/Guardians'
import Bus from './routes/Buses/Bus'
import Driver from './routes/Drivers/Driver'
import Guardian from './routes/Guardians/Guardian'
import Organization from './routes/Organizations/Organization'
import Rider from './routes/Riders/Rider'
import Home from './routes/Root/Home'
import MyRiders from './routes/Riders/MyRiders'
import { ApiContext } from './contexts/ApiContext'
import { RiderTrackerAPI } from './API'

type AppProps = {
  signOut?: UseAuthenticator["signOut"]
  user?: AuthUser
}

function App({ user }: AppProps) {
  const [groups, setGroups] = useState<string[]>()
  const [api, setApi] = useState<RiderTrackerAPI>(new RiderTrackerAPI(''))
  const [heaviestRole, setHeaviestRole] = useState<string>('')
  const [userFullName, setUserFullName] = useState<string>('')
  const [userPictureUrl, setUserPictureUrl] = useState<string>('')

  const initialize = useCallback(async () => {
    const session = await fetchAuthSession()
    const idToken = session.tokens?.idToken
    const sessionGroups = idToken?.payload["cognito:roles"]
    const sessionGroupsArray = sessionGroups as Array<string>
    const trimmedGroups: string[] = []

    sessionGroupsArray.forEach((sg) => {
      trimmedGroups.push(sg.split('/')[1]);
    })

    initializeApi(idToken?.toString() ?? '')
    initializeUserData()

    setGroups(trimmedGroups)
  }, [user])

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (groups) {
      const heaviestRoleFromGroups = getHeaviestRole(groups ?? [])
      setHeaviestRole(heaviestRoleFromGroups)
    }
  }, [groups])

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
      children: [
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
  }, [groups, heaviestRole])

  return (
    <Box width='100%' height='100%'>
      <RoleContext.Provider value={{heaviestRole, setHeaviestRole, userFullName, setUserFullName, userPictureUrl, setUserPictureUrl}}>
        <ApiContext.Provider value={{api, setApi}}>
          {heaviestRole ? <RouterProvider router={router} /> : null}
        </ApiContext.Provider>
      </RoleContext.Provider>
    </Box>
  )
}

export default withAuthenticator(App, { hideSignUp: true })
