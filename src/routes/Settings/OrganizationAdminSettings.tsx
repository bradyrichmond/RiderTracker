import { Card, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const OrganizationAdminSettings = () => {
    return (
        <Grid sm={12} md={6}>
            <Card sx={{ p: '2rem' }}>
                <Typography variant='h4' sx={{ pb: '.5rem' }}>
                    Organization Admins
                </Typography>
                Need to figure out how to get users in group just for one org
                BIG problem...maybe need to switch to generating cognito pools for each org
            </Card>
        </Grid>
    )
}

export default OrganizationAdminSettings