import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"

interface SetOrgSlugProps {
    slugSuggestion: string
    currentSlug: string
}

const SetOrgSlug = ({ slugSuggestion, currentSlug }: SetOrgSlugProps) => {
    const { register } = useFormContext()

    return (
        <Box>
            <Typography variant='h5'>Set a unique identifier for your organization. This will be used for your application URL.</Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pt: '.5rem', pb: '.5rem' }}>
                <Typography>{currentSlug ?? slugSuggestion}.ridertracker.com</Typography>
            </Box>
            <TextField label="Organization Slug" {...register('orgSlug')} fullWidth/>
        </Box>
    )
}

export default SetOrgSlug