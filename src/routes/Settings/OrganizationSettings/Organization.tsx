import Grid from '@mui/material/Unstable_Grid2'
import OrganizationAdminSettings from "./OrganizationAdminSettings"
import OrganizationLogoSettings from "./OrganizationLogoSettings"

const Organization = () => {
    return (
        <Grid container spacing={2} disableEqualOverflow>
            <OrganizationAdminSettings />
            <OrganizationLogoSettings />
        </Grid>
    )
}

export default Organization