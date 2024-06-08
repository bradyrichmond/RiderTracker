import './index.css'
import { Box } from '@mui/material'
import RootRouter from './routes/Root/RootRouter'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import { SnackbarContextProvider } from './contexts/SnackbarContextProvider'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './helpers/I18n'

function App() {
  return (
    <Box width='100%' height='100%'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeContextProvider>
          <SnackbarContextProvider>
            <RootRouter />
          </SnackbarContextProvider>
        </ThemeContextProvider>
      </LocalizationProvider>
    </Box>
  )
}

export default App
