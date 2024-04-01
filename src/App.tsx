import { withAuthenticator } from '@aws-amplify/ui-react'
import { type AuthUser } from "aws-amplify/auth"
import '@aws-amplify/ui-react/styles.css'
import './index.css'
import { Box } from '@mui/material'
import { RoleContextProvider } from './contexts/RoleContextProvider'
import RootRouter from './routes/Root/RootRouter'
import { ApiContextProvider } from './contexts/ApiContextProvider'

type AppProps = {
  user?: AuthUser
}

function App({ user }: AppProps) {
  return (
    <Box width='100%' height='100%'>
      <RoleContextProvider>
        <ApiContextProvider>
          {user ? <RootRouter user={user} /> : null}
        </ApiContextProvider>
      </RoleContextProvider>
    </Box>
  )
}

export default withAuthenticator(App, { hideSignUp: true })
