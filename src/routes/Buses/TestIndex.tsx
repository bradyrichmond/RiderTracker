import { getBuses, getBusesForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { BusType } from "../../types/BusType"
import { useParams } from 'react-router-dom'

interface TestIndexProps {
    fetchForOrg?: boolean
}

const TestIndex = ({ fetchForOrg }: TestIndexProps) => {
    const { id } = useParams()
    const getEntitiesFunction = (fetchForOrg && id) ? getBusesForOrganization : getBuses

    const getEntities = async (token: string, id?: string): Promise<BusType[]> => {
        const buses = await getEntitiesFunction(token, id ?? '')
        const busesResult = await buses.json()
        return busesResult
    }
    
    return (
        <EntityViewer<BusType> 
            getEntities={getEntities}
            rowLinkPath='/buses'
            titleSingular='Bus'
            titlePlural='Buses'
        />
    )
}

export default TestIndex