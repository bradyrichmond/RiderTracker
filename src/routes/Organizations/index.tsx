import { useContext, useState } from "react"
import { createOrganization, deleteOrganization, getOrganizations } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { OrganizationType } from "../../types/OrganizationType"
import { organizationFactory } from "./OrganizationFactory"
import { RoleContext } from "../../contexts/RoleContext"
import { Button, Tooltip } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from "react-router-dom"

const Organizations = () => {
    const [organizations, setOrganizations] = useState<OrganizationType[]>([])
    const roleContext = useContext(RoleContext)
    const navigate = useNavigate()

    const updateOrganizations = async () => {
        const organizationsData = await getOrganizations(roleContext.token)
        setOrganizations(organizationsData)
    }

    const showOrganizationDetails = (organizationId: string) => {
        navigate(`/organizations/${organizationId}`)
    }

    const deleteOrganizationAction = async (organizationId: string) => {
        await deleteOrganization(roleContext.token, organizationId)
        updateOrganizations()
    }
    
    return (
        <EntityViewer<OrganizationType>
            createEntity={createOrganization}
            entityFactory={organizationFactory}
            getEntities={updateOrganizations}
            entities={organizations}
            gridColumns={[
                { field: 'id',  headerName: 'id', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => showOrganizationDetails(params.row.id)}
                        >
                            <Tooltip title='View Details'>
                                <InfoIcon />
                            </Tooltip>
                        </Button>
                    )
                }},
                { field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteOrganizationAction(params.row.id)}
                        >
                            <Tooltip title='Delete Guardian?'>
                                <CancelIcon />
                            </Tooltip>
                        </Button>
                    )
                }}
            ]}
            titleSingular='Organization'
            titlePlural='Organizations'
        />
    )
}

export default Organizations