import { Card } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ProfileSettings from './ProfileSettings'

const Profile = () => {
    return (
        <Grid container spacing={2} disableEqualOverflow>
            <ProfileSettings />
            <Grid sm={12} md={6}>
                <Card>
                    Update Password
                </Card>
            </Grid>
        </Grid>
    )
}

export default Profile