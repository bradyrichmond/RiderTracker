import EntityViewer from '@/components/EntityViewer'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { RoleContext } from '@/contexts/RoleContext'
import { UserType } from '@/types/UserType'
import { userFactory } from '../Settings/UserSettings/UserFactory'
import { useOrgStore } from '@/store/OrgStore'

const Drivers = () => {
    const [drivers, setDrivers] = useState<UserType[]>([])
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useOrgStore()

    const updateDriversAction = async () => {
        try {
            const { driverIds } = await api.organizations.getOrganizationById(orgId)
            if (driverIds) {
                const drivers = await api.users.getBulkUsersByIds(orgId, driverIds)
                setDrivers(drivers)
            }
        } catch {
            console.error('updateDriversAction failed')
        }
    }

    const viewDriverDetails = (driverId: string) => {
        navigate(`/drivers/${driverId}`)
    }

    const deleteDriverAction = async (driverId: string) => {
        await api.users.deleteUser(orgId, driverId)
        try {
            updateDriversAction()
        } catch (e) {
            console.error(e as string)
        }
    }

    const createDriverAction = async () => {
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
                        onClick={() => viewDriverDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            } }
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_DRIVER)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteDriverAction(params.row.id)}
                        >
                            <Tooltip title='Delete Driver'>
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
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_DRIVER) ? createDriverAction : undefined}
            entityFactory={userFactory}
            getEntities={updateDriversAction}
            entities={drivers}
            modalFormInputs={{ inputs: [
                { name: 'First Name' },
                { name: 'Last Name' },
                { name: 'Email', inputType: 'email' }
            ] }}
            gridColumns={generateGridColumns()}
            titleSingular='Driver'
            titlePlural='Drivers'
            processRowUpdate={processRowUpdate}
        />
    )
}

export default Drivers