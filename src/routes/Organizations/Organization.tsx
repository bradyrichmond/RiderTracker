import { Box, Typography } from "@mui/material"
import OrganizationRiders from "./OrganizationRiders"
import OrganizationGuardians from "./OrganizationGuardians"

const Organization = () => {

    return (
        <Box height='100%'>
            <Typography variant="h1">Organization Data</Typography>
            <OrganizationRiders />
            <OrganizationGuardians />
        </Box>
    )
}

export default Organization