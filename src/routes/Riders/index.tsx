import { createGuardian, getRiders, getRidersForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import RiderRow from "./RiderRow"
import { riderFactory } from "./RiderFactory"

interface RidersProps {
    fetchForOrg?: boolean
}

const Riders = ({ fetchForOrg }: RidersProps) => {
    const { id } = useParams()
    const getRidersFunction = (fetchForOrg && id) ? getRidersForOrganization : getRiders

    const getRidersAction = async (token: string, id?: string): Promise<[]> => {
        const riders = await getRidersFunction(token, id ?? '')
        const ridersResult = await riders.json()
        return ridersResult
    }
    
    return (
        <EntityViewer<RiderType>
            createEntity={createGuardian}
            entityFactory={riderFactory}
            getEntities={getRidersAction}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            Row={RiderRow}
            titleSingular='Rider'
            titlePlural='Riders'
        />
    )
}

export default Riders