import EntityViewer from "../../components/EntityViewer"
import { useNavigate } from 'react-router-dom'
import { GuardianType } from "../../types/GuardianType"
import { guardianFactory } from "./GuardianFactory"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GridColDef } from "@mui/x-data-grid"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"
import { RoleContext } from "../../contexts/RoleContextProvider"

const Guardians = () => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const { api } = useContext(ApiContext)
    const { heaviestRole, organizationId } = useContext(RoleContext)
    const getGuardiansFunction = organizationId ? api.guardians.getGuardiansForOrganization : api.guardians.getGuardians
    const navigate = useNavigate()

    const updateGuardians = async () => {
        const guardiansData = await api.execute(getGuardiansFunction, [organizationId])
        setGuardians(guardiansData)
    }

    const deleteGuardianAction = async (guardianId: string) => {
        await api.execute(api.guardians.deleteGuardian, [guardianId])
        updateGuardians()
    }

    const viewGuardianDetails = (guardianId: string) => {
        navigate(`/guardians/${guardianId}`)
    }

    const createGuardianAction = async (newGuardian: GuardianType) => {
        return await api.execute(api.guardians.createGuardian, [newGuardian])
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
                        onClick={() => viewGuardianDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_GUARDIAN)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
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
                }
            })
        }

        return initialGridColumns
    }
    
    return (
        <EntityViewer<GuardianType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_GUARDIAN) ? createGuardianAction : undefined}
            entityFactory={guardianFactory}
            getEntities={updateGuardians}
            entities={guardians}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular='Guardian'
            titlePlural='Guardians'
        />
    )
}

export default Guardians