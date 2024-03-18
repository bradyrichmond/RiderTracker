import { Box } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import { OrganizationType } from "../../types/OrganizationType"

const Organizations = () => {
    const organizations = useLoaderData() as OrganizationType[]

    return (
        <Box>
            Organizations
            <Box>
                {organizations && organizations.map((organization) => {
                    return (<Box key={organization.id}>{organization.id}</Box>)
                })}
            </Box>
        </Box>
    )
}

export default Organizations;