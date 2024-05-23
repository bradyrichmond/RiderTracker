import { SupportedLangs } from '@/constants/SupportedLangs'
import { create } from 'zustand'

interface I18nStore {
    language: SupportedLangs
    setLanguage(lang: SupportedLangs): void
    open: boolean,
    setOpen(open: boolean): void
}

export const useI18nStore = create<I18nStore>((set) => ({
    language: SupportedLangs.EN,
    setLanguage: (language: SupportedLangs) => {
        set({ language })
    },
    open: false,
    setOpen: (isOpen: boolean) => {
        set({ open: isOpen })
    }
}))
