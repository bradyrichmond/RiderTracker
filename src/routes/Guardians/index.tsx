import { useNavigate } from 'react-router-dom'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { useApiStore } from '@/store/ApiStore'
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { GuardianType, UserType } from '@/types/UserType'
import NewEntityViewer from '@/components/NewEntityViewer'
import CreateGuardianDialog from './CreateGuardianDialog'
import { useOrgStore } from '@/store/OrgStore'
import { useUserStore } from '@/store/UserStore'
import { useGuardianStore } from '@/store/GuardianStore'

export interface CreateGuardianInput {
    given_name: string
    family_name: string
    email: string
    address: string
}

const Guardians = () => {
    const { guardians, getGuardians, changeSearchArg } = useGuardianStore()
    const { api } = useApiStore()
    const { heaviestRole } = useUserStore()
    const { orgId } = useOrgStore()
    const { deleteGuardian } = useGuardianStore()
    const navigate = useNavigate()
    const [isAddingGuardian, setIsAddingGuardian] = useState<boolean>(false)

    useEffect(() => {
        getGuardians()
    }, [])

    const deleteGuardianAction = async (guardian: GuardianType) => {
        await deleteGuardian(guardian)
    }

    const viewGuardianDetails = (guardianId: string) => {
        navigate(`/guardians/${guardianId}`)
    }

    const createGuardian = async (guardian: CreateGuardianInput) => {
        const { given_name, family_name, email, address } = guardian
        const validatedAddress = await api?.addresses.validateAddress(address)

        if (validatedAddress) {
            await api?.admin.createGuardian({ given_name, family_name, email }, validatedAddress, orgId)
        }

        toggleShowModal()
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'riderIds',  headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[] | null) => {
                return Array.isArray(value) ? value.filter((v) => v !== '').length : 0
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
                            onClick={() => deleteGuardianAction(params.row)}
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
            searchAction={changeSearchArg}
            refreshAction={getGuardians}
        />
    )
}

export default Guardians