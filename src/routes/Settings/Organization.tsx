import { Grid } from "@mui/material"
import OrganizationAdminSettings from "./OrganizationAdminSettings"
import OrganizationLogoSettings from "./OrganizationLogoSettings"

const Organization = () => {
    return (
        <Grid xs={12} container spacing={2}>
            <OrganizationAdminSettings />
            <OrganizationLogoSettings />
        </Grid>
    )
}

export default Organization