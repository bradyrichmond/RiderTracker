import { useContext, useState } from "react"
import EntityViewer from "../../components/EntityViewer"
import { OrganizationType } from "../../types/OrganizationType"
import { organizationFactory } from "./OrganizationFactory"
import { Button, Tooltip } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from "react-router-dom"
import { ApiContext } from "../../contexts/ApiContext"

const Organizations = () => {
    const [organizations, setOrganizations] = useState<OrganizationType[]>([])
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)

    const updateOrganizations = async () => {
        const organizationsData = await api.execute(api.organizations.getOrganizations, [])
        setOrganizations(organizationsData)
    }

    const showOrganizationDetails = (organizationId: string) => {
        navigate(`/organizations/${organizationId}`)
    }

    const deleteOrganizationAction = async (organizationId: string) => {
        await api.execute(api.organizations.deleteOrganization, [organizationId])
        updateOrganizations()
    }

    const createOrganization = async (newOrganization: OrganizationType) => {
        await api.execute(api.organizations.createOrganization, [newOrganization])
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