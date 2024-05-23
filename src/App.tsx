import './index.css'
import { Box } from '@mui/material'
import { RoleContextProvider } from './contexts/RoleContextProvider'
import RootRouter from './routes/Root/RootRouter'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import { SnackbarContextProvider } from './contexts/SnackbarContextProvider'
import './helpers/I18n'

function App() {
  return (
    <Box width='100%' height='100%'>
        <RoleContextProvider>
          <ThemeContextProvider>
            <SnackbarContextProvider>
              <RootRouter />
            </SnackbarContextProvider>
          </ThemeContextProvider>
        </RoleContextProvider>
    </Box>
  )
}

export default App
