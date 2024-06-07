import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createTheme, PaletteMode, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { createContext, useMemo } from 'react';

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light'
})

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [mode, setMode] = useLocalStorage<PaletteMode>('riderTracker_color_mode', 'light')

    const muiWrapperUtils = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevValue: PaletteMode) => { return prevValue === 'light' ? 'dark' : 'light' } )
            },
        }), [setMode]
    )

    const theme = useMemo(
        () => {
            const buildingTheme = createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#3f51b5',
                    },
                    secondary: {
                        main: '#f50057',
                    },
                },
                spacing: 8,
                shape: {
                   borderRadius: 4,
                },
                components: {
                    MuiTextField: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                marginTop: theme.spacing(2)
                            })
                        }
                    }
                }
            })

            return responsiveFontSizes(buildingTheme)
        },
        [mode]
    )

    return (
        <ThemeContext.Provider value={{ toggleColorMode: muiWrapperUtils.toggleColorMode, mode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider