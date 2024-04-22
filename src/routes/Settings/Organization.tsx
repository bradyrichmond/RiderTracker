import Grid from "@mui/material/Unstable_Grid2/Grid2"
import OrganizationAdminSettings from "./OrganizationAdminSettings"

const Organization = () => {
    return (
        <Grid container spacing={2} disableEqualOverflow>
            <OrganizationAdminSettings />
        </Grid>
    )
}

export default Organization