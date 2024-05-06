import EntityViewer from "../../components/EntityViewer"
import { useNavigate } from 'react-router-dom'
import { guardianFactory } from "./GuardianFactory"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GridColDef } from "@mui/x-data-grid"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { UserType } from "@/types/UserType"
// import { AWSUserType } from "@/API/AdminApis"

const Guardians = () => {
    const [guardians, setGuardians] = useState<UserType[]>([])
    const { api } = useContext(ApiContext)
    const { heaviestRole, organizationId } = useContext(RoleContext)
    const navigate = useNavigate()

    const updateGuardians = async () => {
        try {
            const { guardianIds } = await api.organizations.getOrganizationById(organizationId)
            if (guardianIds) {
                const orgGuardians = await api.users.getBulkUsersByIds(organizationId, guardianIds)
                setGuardians(orgGuardians)
            }
        } catch (e) {
            console.log(e as string)
        }
    }

    const deleteGuardianAction = async (guardianId: string) => {
        await api.users.deleteUser(organizationId, guardianId)
        updateGuardians()
    }

    const viewGuardianDetails = (guardianId: string) => {
        navigate(`/guardians/${guardianId}`)
    }

    const createGuardianAction = async (_newGuardian: UserType) => {
        try {
            // TODO: Needs finer error management
            // const cognitoUser: AWSUserType = await api.admin.createUser(organizationId, { 
            //     given_name: newGuardian.firstName,
            //     family_name: newGuardian.lastName,
            //     email: newGuardian.email
            // })
            // const cognitoUsername = cognitoUser.User.Username
            // await api.admin.addUserToGroup(cognitoUsername, RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN)
            // newGuardian.id = cognitoUsername
            // const { guardianIds } = await api.organizations.getOrganizationById(organizationId)

            // if (guardianIds) {
            //     guardianIds.push(cognitoUsername)
            // }

            // const builtGuardians  = guardianIds || [cognitoUsername]

            // await api.organizations.updateOrganization(organizationId, { guardianIds: builtGuardians })
            // updateGuardians()
            throw ''
        } catch {
            console.error('disabled')
        }
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'viewDetails', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
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
                field: 'delete', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
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
        <EntityViewer<UserType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_GUARDIAN) ? createGuardianAction : undefined}
            entityFactory={guardianFactory}
            getEntities={updateGuardians}
            entities={guardians}
            modalFormInputs={{inputs: [
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