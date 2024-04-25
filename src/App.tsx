import '@aws-amplify/ui-react/styles.css'
import './index.css'
import { Box } from '@mui/material'
import { RoleContextProvider } from './contexts/RoleContextProvider'
import RootRouter from './routes/Root/RootRouter'
import { ApiContextProvider } from './contexts/ApiContextProvider'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import { SnackbarContextProvider } from './contexts/SnackbarContextProvider'
import { AuthContextProvider } from './contexts/AuthContextProvider'

function App() {
  return (
    <Box width='100%' height='100%'>
      <ApiContextProvider>
        <RoleContextProvider>
          <ThemeContextProvider>
            <SnackbarContextProvider>
              <AuthContextProvider>
                <RootRouter />
              </AuthContextProvider>
            </SnackbarContextProvider>
          </ThemeContextProvider>
        </RoleContextProvider>
      </ApiContextProvider>
    </Box>
  )
}

export default App
