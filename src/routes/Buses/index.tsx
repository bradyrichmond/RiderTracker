import { createBus, deleteBus, getBuses, getBusesForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { BusType } from "../../types/BusType"
import { useNavigate, useParams } from 'react-router-dom'
import { busFactory } from "./BusFactory"
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import { RoleContext } from "../../contexts/RoleContext"
import InfoIcon from '@mui/icons-material/Info'
import NoTransferIcon from '@mui/icons-material/NoTransfer'

interface BusesProps {
    fetchForOrg?: boolean
}

const Buses = ({ fetchForOrg }: BusesProps) => {
    const [buses, setBuses] = useState<BusType[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    const roleContext = useContext(RoleContext)
    const getBusesFunction = (fetchForOrg && id) ? getBusesForOrganization : getBuses

    const updateBusesAction = async (token: string, id?: string) => {
        const buses = await getBusesFunction(token, id ?? '')
        setBuses(buses)
    }

    const viewBusDetails = (busId: string) => {
        navigate(`/buses/${busId}`)
    }

    const deleteBusAction = async (busId: string) => {
        await deleteBus(roleContext.token, busId)
    }
    
    return (
        <EntityViewer<BusType>
            createEntity={createBus}
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
                            <Tooltip title='Delete Guardian?'>
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
                            <Tooltip title='Delete Guardian?'>
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