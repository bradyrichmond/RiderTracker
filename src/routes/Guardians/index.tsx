import EntityViewer from '@/components/EntityViewer'
import { useNavigate } from 'react-router-dom'
import { guardianFactory } from './GuardianFactory'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { RoleContext } from '@/contexts/RoleContext'
import { UserType } from '@/types/UserType'
import { OrgDataContext } from '@/contexts/OrgDataContext'

const Guardians = () => {
    const [guardians, setGuardians] = useState<UserType[]>([])
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)
    const navigate = useNavigate()

    const updateGuardians = async () => {
        try {
            const { guardianIds } = await api.organizations.getOrganizationById(orgId)
            if (guardianIds) {
                const orgGuardians = await api.users.getBulkUsersByIds(orgId, guardianIds)
                setGuardians(orgGuardians)
            }
        } catch (e) {
            console.log(e as string)
        }
    }

    const deleteGuardianAction = async (guardianId: string) => {
        await api.users.deleteUser(orgId, guardianId)
        updateGuardians()
    }

    const viewGuardianDetails = (guardianId: string) => {
        navigate(`/guardians/${guardianId}`)
    }

    const createGuardianAction = async () => {
        return 
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
            } }
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

    const processRowUpdate = async (updatedRow: UserType) => {
        return updatedRow
    }

    return (
        <EntityViewer<UserType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_GUARDIAN) ? createGuardianAction : undefined}
            entityFactory={guardianFactory}
            getEntities={updateGuardians}
            entities={guardians}
            modalFormInputs={{ inputs: [
                { name: 'First Name' },
                { name: 'Last Name' }
            ] }}
            gridColumns={generateGridColumns()}
            titleSingular='Guardian'
            titlePlural='Guardians'
            processRowUpdate={processRowUpdate}
        />
    )
}

export default Guardians