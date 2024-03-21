import { createBus, getBuses, getBusesForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { BusType } from "../../types/BusType"
import { useParams } from 'react-router-dom'
import BusRow from "./BusRow"

interface BusesProps {
    fetchForOrg?: boolean
}

const Buses = ({ fetchForOrg }: BusesProps) => {
    const { id } = useParams()
    const getBusesFunction = (fetchForOrg && id) ? getBusesForOrganization : getBuses

    const getBusesAction = async (token: string, id?: string): Promise<BusType[]> => {
        const buses = await getBusesFunction(token, id ?? '')
        const busesResult = await buses.json()
        return busesResult
    }
    
    return (
        <EntityViewer<BusType>
            createEntity={createBus}
            getEntities={getBusesAction}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "Bus Number" }
            ]}}
            Row={BusRow}
            titleSingular='Bus'
            titlePlural='Buses'
        />
    )
}

export default Buses