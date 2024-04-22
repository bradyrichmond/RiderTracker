import { Card, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import UpdatePasswordForm from "./UpdatePasswordForm"

const PasswordSettings = () => {
    return (
        <Grid sm={12} md={6}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant='h4' sx={{ pb: '.5rem' }}>
                    Update Password
                </Typography>
                <UpdatePasswordForm />
            </Card>
        </Grid>
    )
}

export default PasswordSettings