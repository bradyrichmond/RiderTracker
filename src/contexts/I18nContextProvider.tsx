import { useLocalStorage } from "@/hooks/useLocalStorage"
import { createContext, useEffect } from "react"
import { PropsWithChildren, useState } from "react"
import { changeLanguage } from 'i18next'
 
export const I18nContext = createContext({
    language: 'en',
    setLanguage(_lng: SupportedLangs) { },
    open: false,
    setOpen(_open: boolean) { }
});

export enum SupportedLangs {
    EN = "en",
    ES = "es",
    FR = "fr",
    ZH = "zh"
}

export const I18nContextProvider = ({ children }: PropsWithChildren<{}>) => {
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
