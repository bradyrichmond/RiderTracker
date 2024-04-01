import EntityViewer from "../../components/EntityViewer"
import { useNavigate, useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { riderFactory } from "./RiderFactory"
import { Button, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { GuardianType } from "../../types/GuardianType"
import { ApiContext } from "../../contexts/ApiContextProvider"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"
import { GridColDef } from "@mui/x-data-grid"
import { RoleContext } from "../../contexts/RoleContextProvider"

interface RidersProps {
    fetchForOrg?: boolean
}

const Riders = ({ fetchForOrg }: RidersProps) => {
    const { id } = useParams()
    const [riders, setRiders] = useState<RiderType[]>([])
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const getRidersFunction = (fetchForOrg && id) ? api.riders.getRidersForOrganization : api.riders.getRiders

    const getRidersAction = async (id?: string) => {
        const riders = await api.execute(getRidersFunction, [id ?? ''])
        setRiders(riders)
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const deleteRiderAction = async (riderId: string) => {
        await api.execute(api.riders.deleteRider, [riderId])
    }

    const createGuardian = async (newGuardian: GuardianType) => {
        await api.execute(api.guardians.createGuardian, [newGuardian])
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1},
            { field: 'lastName',  headerName: 'Last Name', flex: 1},
            { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewRiderDetails(params.row.id)}
                    >
                        <Tooltip title='Delete Guardian?'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_RIDER)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteRiderAction(params.row.id)}
                        >
                            <Tooltip title='Delete Guardian?'>
                                <PersonRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }
    
    return (
        <EntityViewer<RiderType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_RIDER) ? createGuardian : undefined}
            entityFactory={riderFactory}
            getEntities={getRidersAction}
            entities={riders}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular='Rider'
            titlePlural='Riders'
        />
    )
}

export default Riders