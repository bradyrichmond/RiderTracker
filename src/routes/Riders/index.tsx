import EntityViewer from "@/components/EntityViewer"
import { useNavigate } from 'react-router-dom'
import { RiderType } from "@/types/RiderType"
import { riderFactory } from "./RiderFactory"
import { Button, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { ApiContext } from "@/contexts/ApiContextProvider"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import { GridColDef } from "@mui/x-data-grid"
import { RoleContext } from "@/contexts/RoleContextProvider"

const Riders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole, organizationId } = useContext(RoleContext)

    const getRidersAction = async () => {
        const riders = await api.riders.getRiders(organizationId)
        setRiders(riders)
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const deleteRiderAction = async (riderId: string) => {
        await api.riders.deleteRider(organizationId, riderId)
    }

    const createRider = async (newRider: RiderType) => {
        await api.riders.createRider(organizationId, newRider)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center'},
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center'},
            { field: 'viewDetails', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewRiderDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_RIDER)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteRiderAction(params.row.id)}
                        >
                            <Tooltip title='Delete Rider?'>
                                <PersonRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: RiderType, _originalRow: RiderType) => {
        return updatedRow
    }
    
    return (
        <EntityViewer<RiderType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_RIDER) ? createRider : undefined}
            entityFactory={riderFactory}
            getEntities={getRidersAction}
            entities={riders ?? []}
            modalFormInputs={{inputs: [
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular='Rider'
            titlePlural='Riders'
            processRowUpdate={processRowUpdate}
        />
    )
}

export default Riders