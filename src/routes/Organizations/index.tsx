import { Box, Button, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { OrganizationType } from "../../types/OrganizationType"
import { createOrganization, getOrganizations } from "../../API"
import {v4 as uuidv4} from 'uuid'

const Organizations = () => {
    const [organizations, setOrganizations] = useState<OrganizationType[]>([])
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateOrganizations()
    }, [roleContext.token])

    const updateOrganizations = async () => {
        const newOrganizationsResponse = await getOrganizations(roleContext.token)
        const newOrganizations = await newOrganizationsResponse.json()
        setOrganizations(newOrganizations)
    }

    const createOrganizationAction = async () => {
        const newOrganizationId = uuidv4()
        await createOrganization(roleContext.token, { id: newOrganizationId })
        updateOrganizations()
    }

    return (
        <Box height='100%' flexDirection='column'>
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    Organizations
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                {organizations && organizations.map((organization) => {
                    return (
                    <Box key={organization.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
                        <Box padding='2rem'>
                            <Typography>{organization.id}</Typography>
                        </Box>
                    </Box>)
                })}
            </Box>
            <Box padding='2rem'>
                <Button onClick={createOrganizationAction} variant='contained'>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <AddCircleIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Add Organization</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default Organizations