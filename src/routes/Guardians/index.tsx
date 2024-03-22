import { createGuardian, getGuardians, getGuardiansForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { useParams } from 'react-router-dom'
import { GuardianType } from "../../types/GuardianType"
import { guardianFactory } from "./GuardianFactory"
import GuardianRow from "./GuardianRow"

interface GuardiansProps {
    fetchForOrg?: boolean
}

const Guardians = ({ fetchForOrg }: GuardiansProps) => {
    const { id } = useParams()
    const getGuardiansFunction = (fetchForOrg && id) ? getGuardiansForOrganization : getGuardians

    const getGuardiansAction = async (token: string, id?: string): Promise<GuardianType[]> => {
        const guardians = await getGuardiansFunction(token, id ?? '')
        const guardiansResult = await guardians.json()
        return guardiansResult
    }
    
    return (
        <EntityViewer<GuardianType>
            createEntity={createGuardian}
            entityFactory={guardianFactory}
            getEntities={getGuardiansAction}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            Row={GuardianRow}
            titleSingular='Guardian'
            titlePlural='Guardians'
        />
    )
}

export default Guardians