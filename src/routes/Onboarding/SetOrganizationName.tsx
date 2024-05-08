import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"

const SetOrganizationName = () => {
    const { register } = useFormContext()

    return (
        <Box>
            <Typography variant='h5'>Set your organization name. You can change this later.</Typography>
            <TextField label="Organization Name" {...register('orgName')} fullWidth/>
        </Box>
    )
}

export default SetOrganizationName