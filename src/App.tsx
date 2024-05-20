import './index.css'
import { Box } from '@mui/material'
import { RoleContextProvider } from './contexts/RoleContextProvider'
import RootRouter from './routes/Root/RootRouter'
import { ApiContextProvider } from './contexts/ApiContextProvider'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import { SnackbarContextProvider } from './contexts/SnackbarContextProvider'
import './helpers/I18n'
import { I18nContextProvider } from './contexts/I18nContextProvider'
import { OrgDataContextProvider } from './contexts/OrgDataContext'

function App() {
  return (
    <Box width='100%' height='100%'>
      <ApiContextProvider>
        <OrgDataContextProvider>
          <RoleContextProvider>
            <ThemeContextProvider>
              <SnackbarContextProvider>
                <I18nContextProvider>
                  <RootRouter />
                </I18nContextProvider>
              </SnackbarContextProvider>
            </ThemeContextProvider>
          </RoleContextProvider>
        </OrgDataContextProvider>
      </ApiContextProvider>
    </Box>
  )
}

export default App
