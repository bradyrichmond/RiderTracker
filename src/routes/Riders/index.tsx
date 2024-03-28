import { createGuardian, deleteRider, getRiders, getRidersForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { useNavigate, useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { riderFactory } from "./RiderFactory"
import { Button, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { RoleContext } from "../../contexts/RoleContext"
import { useContext, useState } from "react"

interface RidersProps {
    fetchForOrg?: boolean
}

const Riders = ({ fetchForOrg }: RidersProps) => {
    const { id } = useParams()
    const [riders, setRiders] = useState<RiderType[]>([])
    const navigate = useNavigate()
    const roleContext = useContext(RoleContext)
    const getRidersFunction = (fetchForOrg && id) ? getRidersForOrganization : getRiders

    const getRidersAction = async (token: string, id?: string) => {
        const riders = await getRidersFunction(token, id ?? '')
        setRiders(riders)
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const deleteRiderAction = async (riderId: string) => {
        await deleteRider(roleContext.token, riderId)

    }
    
    return (
        <EntityViewer<RiderType>
            createEntity={createGuardian}
            entityFactory={riderFactory}
            getEntities={getRidersAction}
            entities={riders}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            gridColumns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => viewRiderDetails(params.row.id)}
                            >
                            <InfoIcon />
                        </Button>
                    )
                }},
                { field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
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
                }}
            ]}
            titleSingular='Rider'
            titlePlural='Riders'
        />
    )
}

export default Riders