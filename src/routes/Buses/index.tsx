import EntityViewer from "../../components/EntityViewer"
import { BusType } from "../../types/BusType"
import { useNavigate, useParams } from 'react-router-dom'
import { busFactory } from "./BusFactory"
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import NoTransferIcon from '@mui/icons-material/NoTransfer'
import { ApiContext } from "../../contexts/ApiContextProvider"

interface BusesProps {
    fetchForOrg?: boolean
}

const Buses = ({ fetchForOrg }: BusesProps) => {
    const [buses, setBuses] = useState<BusType[]>([])
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const navigate = useNavigate()
    const getBusesFunction = (fetchForOrg && id) ? api.buses.getBusesForOrganization : api.buses.getBuses

    const updateBusesAction = async (id?: string) => {
        const buses = await api.execute(getBusesFunction, [id])
        setBuses(buses ?? [])
    }

    const viewBusDetails = (busId: string) => {
        navigate(`/buses/${busId}`)
    }

    const deleteBusAction = async (busId: string) => {
        await api.execute(api.buses.deleteBus, [busId])
        updateBusesAction()
    }

    const createBusAction = async (newBus: BusType) => {
        return await api.execute(api.buses.createBus, [newBus])
    }
    
    return (
        <EntityViewer<BusType>
            createEntity={createBusAction}
            entityFactory={busFactory}
            getEntities={updateBusesAction}
            entities={buses}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "Bus Number" }
            ]}}
            gridColumns={[
                { field: 'id',  headerName: 'ID', flex: 1},
                { field: 'viewDetails', headerName: '', renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => viewBusDetails(params.row.id)}
                        >
                            <Tooltip title='View details'>
                                <InfoIcon />
                            </Tooltip>
                        </Button>
                    )
                }},
                { field: 'delete', headerName: '', renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteBusAction(params.row.id)}
                        >
                            <Tooltip title='Delete Bus?'>
                                <NoTransferIcon />
                            </Tooltip>
                        </Button>
                    )
                }}
            ]}
            titleSingular='Bus'
            titlePlural='Buses'
        />
    )
}

export default Buses