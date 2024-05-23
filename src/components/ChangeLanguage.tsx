import { Autocomplete, Box, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import { Transition } from './AddEntityModal'
import Flag from 'react-flagkit'
import { SyntheticEvent, useState } from 'react'
import { MenuItem } from '@mui/material'
import { MenuItemWithIcon } from './ResponsiveAppBar'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@mui/icons-material/Language'
import { SupportedLangs } from '@/constants/SupportedLangs'
import { useI18nStore } from '@/store/I18nStore'

interface LanguageOptionsType {
    label: string
    id: SupportedLangs
    countryCode: string
}

const ChangeLanguage = () => {
    const { setLanguage, open, setOpen } = useI18nStore()
    const [localLanguage, setLocalLanguage] = useState<SupportedLangs>(SupportedLangs.EN)
    const { t } = useTranslation('common')

    const handleSubmit = () => {
        setLanguage(localLanguage)
    }

    const handleSelectChange =  (_e: SyntheticEvent, value: LanguageOptionsType | null) => {
        setLocalLanguage(value?.id ?? SupportedLangs.EN)
    }

    const options: LanguageOptionsType[] = [
        {
            label: 'English',
            id: SupportedLangs.EN,
            countryCode: 'US'
        },
        {
            label: 'Español',
            id: SupportedLangs.ES,
            countryCode: 'MX'
        },
        {
            label: 'Français',
            id: SupportedLangs.FR,
            countryCode: 'FR'
        },
        {
            label: '中文',
            id: SupportedLangs.ZH,
            countryCode: 'CN'
        }
    ]

    return (
        <>
            <Dialog
                open={open}
                onClose={close}
                TransitionComponent={Transition}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                    sx: { padding: '2rem', minWidth: '25%' }
                }}
            >
                <DialogTitle>Change Site Language</DialogTitle>
                <Autocomplete
                    id={'languageSelectAutoComplete'}
                    options={options}
                    getOptionLabel={(option: LanguageOptionsType) => option.label}
                    filterSelectedOptions
                    onChange={handleSelectChange}
                    renderOption={(props, option) => (
                        <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <Flag country={option.countryCode} />
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('languageSelect')}
                            id={'languageSelectLabel'}
                        />
                    )}
                />
                <Button variant='contained' sx={{ mt: '2rem' }} onClick={handleSubmit}>{t('submitChanges')}</Button>
            </Dialog>
            <MenuItem onClick={() => setOpen(true)}>
                <MenuItemWithIcon Icon={LanguageIcon} label={t('changeLanguage')} color='primary' />
            </MenuItem>
        </>
    )
}

export default ChangeLanguage