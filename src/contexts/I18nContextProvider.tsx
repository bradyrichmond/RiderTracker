import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Dispatch, SetStateAction, createContext, useEffect } from "react"
import { PropsWithChildren, useState } from "react"
import { changeLanguage } from 'i18next'
import { SupportedLangs } from "@/constants/SupportedLangs"

interface I18nContextProps {
    language: SupportedLangs
    setLanguage: Dispatch<SetStateAction<SupportedLangs>>
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const I18nContext = createContext<I18nContextProps>({
    language: SupportedLangs.EN,
    setLanguage: () => {},
    open: false,
    setOpen: () => {}
});

export const I18nContextProvider = ({ children }: PropsWithChildren) => {
    const [language, setLanguage] = useLocalStorage<SupportedLangs>('riderTracker_locale', SupportedLangs.EN)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        changeLanguage(language)
        setOpen(false)
    }, [language])

    return (
        <I18nContext.Provider value={{ language, setLanguage, open, setOpen }}>
            {children}
        </I18nContext.Provider>
    );
};
