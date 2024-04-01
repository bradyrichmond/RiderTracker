import { withAuthenticator } from '@aws-amplify/ui-react'
import { fetchAuthSession, type AuthUser } from "aws-amplify/auth"
import { type UseAuthenticator } from "@aws-amplify/ui-react-core"
import '@aws-amplify/ui-react/styles.css'
import { useCallback, useEffect, useState } from 'react'
import './index.css'
import { Box } from '@mui/material'
import { RoleContextProvider } from './contexts/RoleContextProvider'
import { ApiContext } from './contexts/ApiContext'
import { RiderTrackerAPI } from './API'
import RootRouter from './routes/Root/RootRouter'

type AppProps = {
  signOut?: UseAuthenticator["signOut"]
  user?: AuthUser
}

function App({ user }: AppProps) {
  const [api, setApi] = useState<RiderTrackerAPI>(new RiderTrackerAPI(''))

  return (
    <Box width='100%' height='100%'>
      <RoleContextProvider>
        <ApiContext.Provider value={{api, setApi}}>
          {user ? <RootRouter user={user} /> : null}
        </ApiContext.Provider>
      </RoleContextProvider>
    </Box>
  )
}

export default withAuthenticator(App, { hideSignUp: true })
