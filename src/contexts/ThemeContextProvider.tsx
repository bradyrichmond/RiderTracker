import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useMemo } from "react";

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  value: 'light'
});

const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [value, setValue] = useLocalStorage<PaletteMode>('riderTracker_color_mode', 'light')

    const muiWrapperUtils = useMemo(
        () => ({
            toggleColorMode: () => {
                setValue((prevValue: PaletteMode) => { return prevValue === "light" ? "dark" : "light" } )
            },
        }),
        []
    )

    const theme = useMemo(
        () =>{
            return (createTheme({
                palette: {
                    mode: value,
                    primary: {
                        main: '#29aaca',
                        light: '#85dcf3',
                        dark: '#0f5f6a',
                    },
                    secondary: {
                        main: '#ca4929',
                        light: '#f27350',
                        dark: '#b03f23',
                    },
                    info: {
                        main: '#2959ca',
                        light: '#9dade5',
                        dark: '#002a93',
                    },
                    success: {
                        main: '#29ca9a',
                        light: '#b2e8d3',
                        dark: '#005f32',
                    },
                },
                typography: {
                    fontFamily: 'Open Sans',
                    fontSize: 16,
                    subtitle1: {
                        fontSize: '1rem',
                        fontFamily: 'Gelasio',
                    },
                    body1: {
                        fontSize: '1rem',
                        fontFamily: 'Gelasio',
                    },
                    caption: {
                        fontSize: '0.8rem',
                        fontFamily: 'Gelasio',
                    },
                    overline: {
                        fontSize: '1rem',
                        fontFamily: 'Gelasio',
                    },
                    h6: {
                        fontSize: '1rem',
                        fontFamily: 'Gelasio',
                    },
                    h5: {
                        fontSize: '1rem',
                        fontFamily: 'Gelasio',
                    },
                    h4: {
                        fontSize: '2.6rem',
                        fontFamily: 'Gelasio',
                    },
                    h3: {
                        fontSize: '4.2rem',
                        fontFamily: 'Gelasio',
                    },
                    h2: {
                        fontSize: '6.9rem',
                        fontFamily: 'Gelasio',
                    },
                    h1: {
                        fontSize: '10rem',
                        fontFamily: 'Gelasio',
                    },
                    subtitle2: {
                        fontFamily: 'Gelasio',
                    },
                    body2: {
                        fontFamily: 'Gelasio',
                    },
                    button: {
                        fontFamily: 'Gelasio',
                    },
                }
            })
        )},
        [value]
    )

    return (
        <ThemeContext.Provider value={{toggleColorMode: muiWrapperUtils.toggleColorMode, value}}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider