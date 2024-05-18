import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext } from "react"
import { PropsWithChildren, useState } from "react"
 
export const SnackbarContext = createContext({
    setSnackbarMessage: (_s: string) => {},
    setSnackbarSeverity: (_ac: AlertColor) => {},
    setSnackbarVisibilityMs: (_n: number) => {},
    setSnackbarVariant: (_s: SnackbarVariants) => {},
    showErrorSnackbar: (_message: string, _visibilityMs?: number) => {}
})

type SnackbarVariants = "filled" | "standard" | "outlined"

export const SnackbarContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error')
    const [snackbarVisibilityMs, setSnackbarVisibilityMs] = useState<number>(5000)
    const [snackbarVariant, setSnackbarVariant] = useState<SnackbarVariants>("filled")

    const onSnackbarClose = () => {
        setSnackbarMessage('')
    }

    const showErrorSnackbar = (message: string, visibilityMs?: number) => {
        setSnackbarSeverity('error')
        setSnackbarVisibilityMs(visibilityMs ?? 5000)
        setSnackbarMessage(message)
    }

    return (
        <SnackbarContext.Provider value={{ setSnackbarMessage, setSnackbarSeverity, setSnackbarVisibilityMs, setSnackbarVariant, showErrorSnackbar }}>
            {children}
            <Snackbar open={!!snackbarMessage} autoHideDuration={snackbarVisibilityMs} onClose={onSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={onSnackbarClose}
                    severity={snackbarSeverity}
                    variant={snackbarVariant}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
