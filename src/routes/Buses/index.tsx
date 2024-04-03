import EntityViewer from "../../components/EntityViewer"
import { BusType } from "../../types/BusType"
import { useNavigate, useParams } from 'react-router-dom'
import { busFactory } from "./BusFactory"
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import NoTransferIcon from '@mui/icons-material/NoTransfer'
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GridColDef } from '@mui/x-data-grid'
import { RoleContext } from "../../contexts/RoleContextProvider"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"

const Buses = () => {
    const [buses, setBuses] = useState<BusType[]>([])
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const navigate = useNavigate()
    const getBusesFunction = id ? api.buses.getBusesForOrganization : api.buses.getBuses

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

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns:GridColDef[] = [
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
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_BUS)) {
            initialGridColumns.push({ 
                field: 'delete',
                headerName: '',
                renderCell: (params) => {
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
                }
            })
        }

        return initialGridColumns
    }
    
    return (
        <EntityViewer<BusType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_BUS) ? createBusAction : undefined}
            entityFactory={busFactory}
            getEntities={updateBusesAction}
            entities={buses}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "Bus Number" }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular='Bus'
            titlePlural='Buses'
        />
    )
}

export default Buses