import { SupportedLangs } from "@/contexts/I18nContextProvider"
import { PaletteMode } from "@mui/material"
import { useState, useEffect } from "react"

const getStorageValue = <T extends PaletteMode | SupportedLangs>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key)
    const initial = saved ?? defaultValue
    // @ts-ignore
    return initial
}

export const useLocalStorage = <T extends PaletteMode | SupportedLangs>(key: string, defaultValue: T) => {
    const [value, setValue] = useState<T>(() => getStorageValue(key, defaultValue))

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue] as const
}