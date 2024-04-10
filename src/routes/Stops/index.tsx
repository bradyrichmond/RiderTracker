import EntityViewer from "@/components/EntityViewer"
import { stopFactory } from "./StopFactory"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GridColDef } from "@mui/x-data-grid"
import { Button, Tooltip } from "@mui/material"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import InfoIcon from '@mui/icons-material/Info'
import WrongLocationIcon from '@mui/icons-material/WrongLocation'
import { RoleContext } from "@/contexts/RoleContextProvider"
import { StopType } from "@/types/StopType"
import { ApiContext } from "@/contexts/ApiContextProvider"

const Stops = () => {
    const [stops, setStops] = useState<StopType[]>([])
    const { id: organizationId } = useParams()
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)

    useEffect(() => {
        updateStops()
    }, [organizationId])

    const updateStops = async () => {
        const fetchedStops = await api.execute(organizationId ? api.stops.getStopsForOrganization : api.stops.getStops, [organizationId])
        setStops(fetchedStops)
    }

    const createStopAction = async (newStop: StopType) => {
        const validStop = newStop
        validStop.riderIds = [""]
        await api.execute(api.stops.createStop, [validStop])
        updateStops()
    }

    const deleteStopAction = async (id: string) => {
        await api.execute(api.stops.createStop, [id])
        updateStops()
    }

    const viewStopDetails = (id: string) => {
        navigate(`/stops/${id}`)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns:GridColDef[] = [
            { field: 'id',  headerName: 'ID', flex: 1},
            { field: 'stopName',  headerName: 'Stop Name', flex: 1},
            { field: 'viewDetails', headerName: '', renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewStopDetails(params.row.id)}
                    >
                        <Tooltip title='View details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_STOP)) {
            initialGridColumns.push({ 
                field: 'delete',
                headerName: '',
                renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteStopAction(params.row.id)}
                        >
                            <Tooltip title='Delete Stop?'>
                                <WrongLocationIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }

    return (
        <EntityViewer<StopType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_STOP) ? createStopAction : undefined}
            entityFactory={stopFactory}
            entities={stops}
            getEntities={updateStops}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "Stop Name", inputType: 'randomNameGenerator' }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular="Stop"
            titlePlural="Stops"
        />
    )
}

export default Stops