import { Box, TextField, Typography } from "@mui/material"
import { useFormContext } from "react-hook-form"

const CreateOrganizationAdmin = () => {
    const { register } = useFormContext()

    return (
        <Box>
            <Typography variant='h5'>Create your first Administrator.</Typography>
            <TextField label="First Name" {...register('adminFirstName')} fullWidth/>
            <TextField label="Last Name" {...register('adminLastName')} fullWidth/>
            <TextField label="Email" {...register('adminEmail')} fullWidth/>
            <TextField type="password" label="Password" {...register('adminPassword')} fullWidth/>
        </Box>
    )
}

export default CreateOrganizationAdmin