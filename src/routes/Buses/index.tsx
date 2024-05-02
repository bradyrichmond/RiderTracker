import EntityViewer from "../../components/EntityViewer"
import { BusType } from "../../types/BusType"
import { useNavigate } from 'react-router-dom'
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
    const { api } = useContext(ApiContext)
    const { heaviestRole, organizationId } = useContext(RoleContext)
    const navigate = useNavigate()

    const updateBusesAction = async () => {
        const buses = await api.buses.getBuses(organizationId)
        setBuses(buses ?? [])
    }

    const viewBusDetails = (busId: string) => {
        navigate(`/buses/${busId}`)
    }

    const deleteBusAction = async (busId: string) => {
        await api.buses.deleteBus(organizationId, busId)
        updateBusesAction()
    }

    const createBusAction = async (newBus: BusType) => {
        return await api.buses.createBus(organizationId, newBus)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns:GridColDef[] = [
            { field: 'id',  headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'viewDetails', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
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
                align: 'center',
                headerAlign: 'center',
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
                { name: "Bus Number" }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular='Bus'
            titlePlural='Buses'
        />
    )
}

export default Buses