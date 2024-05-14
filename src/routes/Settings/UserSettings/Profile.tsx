import Grid from '@mui/material/Unstable_Grid2'
import ProfileSettings from './ProfileSettings'
import PasswordSettings from './PasswordSettings'

const Profile = () => {
    return (
        <Grid container spacing={2} disableEqualOverflow>
            <ProfileSettings />
            <PasswordSettings />
        </Grid>
    )
}

export default Profile