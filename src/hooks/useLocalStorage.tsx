import { SupportedLangs } from "@/constants/SupportedLangs"
import { PaletteMode } from "@mui/material"
import { useState, useEffect } from "react"

const getStorageValue = <T extends PaletteMode | SupportedLangs>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key)
    const initial = saved ?? defaultValue
    return initial as T
}

export const useLocalStorage = <T extends PaletteMode | SupportedLangs>(key: string, defaultValue: T) => {
    const [value, setValue] = useState<T>(() => getStorageValue(key, defaultValue))

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue] as const
}