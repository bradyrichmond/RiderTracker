import { createOrganization, getOrganizations } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { OrganizationType } from "../../types/OrganizationType"
import { organizationFactory } from "./OrganizationFactory"
import OrganizationRow from "./OrganizationRow"

const Organizations = () => {
    const getOrganizationsAction = async (token: string): Promise<OrganizationType[]> => {
        const organizations = await getOrganizations(token)
        const organizationsResult = await organizations.json()
        return organizationsResult
    }
    
    return (
        <EntityViewer<OrganizationType>
            createEntity={createOrganization}
            entityFactory={organizationFactory}
            getEntities={getOrganizationsAction}
            Row={OrganizationRow}
            titleSingular='Organization'
            titlePlural='Organizations'
        />
    )
}

export default Organizations