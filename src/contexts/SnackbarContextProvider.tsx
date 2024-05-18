import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext } from "react"
import { PropsWithChildren, useState } from "react"

interface SnackbarContextProps {
    showErrorSnackbar: (message: string, visibilityMs?: number) => void
}
 
export const SnackbarContext = createContext<SnackbarContextProps>({
    showErrorSnackbar: () => {}
})

export const SnackbarContextProvider = ({ children }: PropsWithChildren) => {
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error')
    const [snackbarVisibilityMs, setSnackbarVisibilityMs] = useState<number>(5000)

    const onSnackbarClose = () => {
        setSnackbarMessage('')
    }

    const showErrorSnackbar = (message: string, visibilityMs?: number) => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(visibilityMs ?? 5000)
        setSnackbarMessage(message)
    }

    return (
        <SnackbarContext.Provider value={{ showErrorSnackbar }}>
            {children}
            <Snackbar open={!!snackbarMessage} autoHideDuration={snackbarVisibilityMs} onClose={onSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={onSnackbarClose}
                    severity={snackbarSeverity}
                    variant='filled'
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
