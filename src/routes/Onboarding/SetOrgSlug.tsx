import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useTranslation } from 'react-i18next'

interface SetOrgSlugProps {
    slugSuggestion: string
    currentSlug: string
}

const SetOrgSlug = ({ slugSuggestion, currentSlug }: SetOrgSlugProps) => {
    const { register } = useFormContext()
    const { t } = useTranslation(['onboarding', 'common'])

    return (
        <Box>
            <Typography variant='h5'>{t('setOrgSlugDescription')}</Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: '.5rem', pb: '.5rem' }}>
                <Typography>{currentSlug ?? slugSuggestion}.ridertracker.com</Typography>
            </Box>
            <TextField label={t('orgSlug', { ns: 'common' })} {...register('orgSlug')} fullWidth/>
        </Box>
    )
}

export default SetOrgSlug