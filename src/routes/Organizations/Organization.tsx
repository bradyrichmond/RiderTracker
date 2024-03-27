import { Box, Typography } from "@mui/material"
import OrganizationRiders from "./OrganizationRiders"
import OrganizationGuardians from "./OrganizationGuardians"
import OrganizationDrivers from "./OrganizationDrivers"

const Organization = () => {

    return (
        <Box height='100%'>
            <Typography variant="h1">Organization Data</Typography>
            <OrganizationRiders />
            <OrganizationGuardians />
            <OrganizationDrivers />
        </Box>
    )
}

export default Organization