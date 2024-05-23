import { useNavigate } from 'react-router-dom'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useEffect, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { useApiStore } from '@/store/ApiStore'
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { RoleContext } from '@/contexts/RoleContext'
import { UserType } from '@/types/UserType'
import NewEntityViewer from '@/components/NewEntityViewer'
import CreateGuardianDialog from './CreateGuardianDialog'
import { useOrgStore } from '@/store/OrgStore'

export interface CreateGuardianInput {
    given_name: string
    family_name: string
    email: string
    address: string
}

const Guardians = () => {
    const [guardians, setGuardians] = useState<UserType[]>([])
    const { api } = useApiStore()
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useOrgStore()
    const navigate = useNavigate()
    const [isAddingGuardian, setIsAddingGuardian] = useState<boolean>(false)

    useEffect(() => {
        updateGuardians()
    }, [orgId])

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

    const createGuardian = async (guardian: CreateGuardianInput) => {
        const { given_name, family_name, email, address } = guardian
        const validatedAddress = await api.addresses.validateAddress(address)
        await api.admin.createGuardian({ given_name, family_name, email }, validatedAddress, orgId)
        toggleShowModal()
        updateGuardians()
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'riderIds',  headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[] | null) => {
                return Array.isArray(value) ? value.length : 0
            } },
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

    const toggleShowModal = () => {
        setIsAddingGuardian((cur) => !cur)
    }

    return (
        <NewEntityViewer<UserType>
            entities={guardians}
            gridColumns={generateGridColumns()}
            titleSingular='Guardian'
            titlePlural='Guardians'
            processRowUpdate={processRowUpdate}
            toggleShowModal={toggleShowModal}
            Modal={() => <CreateGuardianDialog cancel={toggleShowModal} createGuardian={createGuardian} isAddingGuardian={isAddingGuardian} />}
        />
    )
}

export default Guardians