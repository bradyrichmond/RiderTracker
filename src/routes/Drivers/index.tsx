import EntityViewer from "../../components/EntityViewer"
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from "react"
import { Alert, Button, Snackbar, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, RIDER_TRACKER_ROLES, permissions } from "../../constants/Roles"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { UserType } from "@/types/UserType"
import { userFactory } from "../Settings/UserFactory"

const Drivers = () => {
    const [drivers, setDrivers] = useState<UserType[]>([])
    const [showErrorSnackbar, setShowErrorSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole, organizationId } = useContext(RoleContext)

    const updateDriversAction = async () => {
        const { driverIds } = await api.organizations.getOrganizationById(organizationId)
        if (driverIds) {
            const drivers = await api.users.getBulkUsersByIds(organizationId, driverIds)
            setDrivers(drivers)
        }
    }

    const viewDriverDetails = (driverId: string) => {
        navigate(`/drivers/${driverId}`)
    }

    const deleteDriverAction = async (driverId: string) => {
        await api.users.deleteUser(organizationId, driverId)
        updateDriversAction()
    }

    const createDriverAction = async (driver: UserType) => {
        try {
            const cognitoUser = await api.admin.createUser(organizationId, { given_name: driver.firstName, family_name: driver.lastName, email: driver.email })
            const cognitoUsername = cognitoUser.User.Username
            await api.admin.addUserToGroup(cognitoUsername, RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER)
            driver.id = cognitoUsername

            const { driverIds } = await api.organizations.getOrganizationById(organizationId)

            if (driverIds) {
                driverIds.push(cognitoUsername)
            }

            const drivers  = driverIds || [cognitoUsername]

            await api.organizations.updateOrganization(organizationId, { driverIds: drivers })
        } catch {
            setSnackbarMessage('Failed to create driver')
            setShowErrorSnackBar(true)
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
                        onClick={() => viewDriverDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
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

    const toggleShowSnackbar = () => setShowErrorSnackBar((cur: boolean) => !cur)
    
    return (
        <>
            <Snackbar open={showErrorSnackbar} autoHideDuration={6000} onClose={toggleShowSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={toggleShowSnackbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <EntityViewer<UserType>
                createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_DRIVER) ? createDriverAction : undefined}
                entityFactory={userFactory}
                getEntities={updateDriversAction}
                entities={drivers}
                modalFormInputs={{inputs: [
                    { name: "First Name" },
                    { name: "Last Name" },
                    { name: "Email", inputType: 'email' }
                ]}}
                gridColumns={generateGridColumns()}
                titleSingular='Driver'
                titlePlural='Drivers'
            />
        </>
    )
}

export default Drivers