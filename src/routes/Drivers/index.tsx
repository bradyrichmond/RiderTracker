import { createDriver, getDrivers, getDriversForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { useParams } from 'react-router-dom'
import DriverRow from "./DriverRow"
import { DriverType } from "../../types/DriverType"
import { driverFactory } from "./DriverFactory"

interface DriversProps {
    fetchForOrg?: boolean
}

const Drivers = ({ fetchForOrg }: DriversProps) => {
    const { id } = useParams()
    const getDriversFunction = (fetchForOrg && id) ? getDriversForOrganization : getDrivers

    const getDriversAction = async (token: string, id?: string): Promise<DriverType[]> => {
        const drivers = await getDriversFunction(token, id ?? '')
        const DriversResult = await drivers.json()
        return DriversResult
    }
    
    return (
        <EntityViewer<DriverType>
            createEntity={createDriver}
            entityFactory={driverFactory}
            getEntities={getDriversAction}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            Row={DriverRow}
            titleSingular='Driver'
            titlePlural='Drivers'
        />
    )
}

export default Drivers