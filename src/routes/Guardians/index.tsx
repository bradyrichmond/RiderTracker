import { createGuardian, deleteGuardian, getGuardians, getGuardiansForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { useNavigate, useParams } from 'react-router-dom'
import { GuardianType } from "../../types/GuardianType"
import { guardianFactory } from "./GuardianFactory"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import { RoleContext } from "../../contexts/RoleContext"

interface GuardiansProps {
    fetchForOrg?: boolean
}

const Guardians = ({ fetchForOrg }: GuardiansProps) => {
    const { id } = useParams()
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const getGuardiansFunction = (fetchForOrg && id) ? getGuardiansForOrganization : getGuardians
    const navigate = useNavigate()
    const roleContext = useContext(RoleContext)

    const updateGuardians = async (token: string, id?: string) => {
        const guardiansData = await getGuardiansFunction(token, id ?? '')
        setGuardians(guardiansData)
    }

    const deleteGuardianAction = async (guardianId: string) => {
        await deleteGuardian(roleContext.token, guardianId)
        updateGuardians(roleContext.token)
    }

    const viewGuardianDetails = (guardianId: string) => {
        navigate(`/guardians/${guardianId}`)
    }
    
    return (
        <EntityViewer<GuardianType>
            createEntity={createGuardian}
            entityFactory={guardianFactory}
            getEntities={updateGuardians}
            entities={guardians}
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
                            onClick={() => viewGuardianDetails(params.row.id)}
                        >
                            <Tooltip title='View Details'>
                                <InfoIcon />
                            </Tooltip>
                        </Button>
                    )
                }},
                { field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteGuardianAction(params.row.id)}
                        >
                            <Tooltip title='Delete Guardian'>
                                <PersonRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }}
            ]}
            titleSingular='Guardian'
            titlePlural='Guardians'
        />
    )
}

export default Guardians