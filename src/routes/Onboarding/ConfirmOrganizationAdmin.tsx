import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"

const ConfirmOrganizationAdmin = () => {
    const { register } = useFormContext()

    return (
        <Box>
            <Typography variant='h5'>
                The Organization Admin will receive an email shortly with a confirmation code. Please enter it in the field below.
            </Typography>
            <TextField label="Confirmation Code" {...register('confirmationCode')} fullWidth/>
        </Box>
    )
}

export default ConfirmOrganizationAdmin