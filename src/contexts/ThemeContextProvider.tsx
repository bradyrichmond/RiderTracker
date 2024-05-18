import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createTheme, PaletteMode, ThemeOptions, ThemeProvider } from '@mui/material';
import { createContext, useMemo } from 'react';

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  value: 'light'
})

const generateThemeOptions = (mode: PaletteMode): ThemeOptions => {
    return {
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
    }
}

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [value, setValue] = useLocalStorage<PaletteMode>('riderTracker_color_mode', 'light')

    const muiWrapperUtils = useMemo(
        () => ({
            toggleColorMode: () => {
                setValue((prevValue: PaletteMode) => { return prevValue === 'light' ? 'dark' : 'light' } )
            },
        }),
        []
    )

    const theme = useMemo(
        () => {
            return (createTheme(generateThemeOptions(value)))
        },
        [value]
    )

    return (
        <ThemeContext.Provider value={{ toggleColorMode: muiWrapperUtils.toggleColorMode, value }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider