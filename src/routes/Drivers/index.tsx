import EntityViewer from "../../components/EntityViewer"
import { useNavigate } from 'react-router-dom'
import { DriverType } from "../../types/DriverType"
import { driverFactory } from "./DriverFactory"
import { useContext, useState } from "react"
import { Alert, Button, Snackbar, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"
import { RoleContext } from "../../contexts/RoleContextProvider"

const Drivers = () => {
    const [drivers, setDrivers] = useState<DriverType[]>([])
    const [showErrorSnackbar, setShowErrorSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole, organizationId } = useContext(RoleContext)
    const getDriversFunction = organizationId ? api.drivers.getDriversForOrganization : api.drivers.getDrivers

    const updateDriversAction = async () => {
        const drivers = await api.execute(getDriversFunction, [organizationId ?? ''])
        setDrivers(drivers)
    }

    const viewDriverDetails = (driverId: string) => {
        navigate(`/drivers/${driverId}`)
    }

    const deleteDriverAction = async (driverId: string) => {
        await api.execute(api.drivers.deleteDriver, [driverId])
        updateDriversAction()
    }

    const createDriverAction = async (driver: DriverType) => {
        try {
            const cognitoUser = await api.execute(api.admin.createUser, [{ given_name: driver.firstName, family_name: driver.lastName, email: driver.email }])
            driver.id = cognitoUser.User.Attributes[0].Value
            return await api.execute(api.drivers.createDriver, [driver])
        } catch (e: any) {
            setSnackbarMessage(e)
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
            <EntityViewer<DriverType>
                createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_DRIVER) ? createDriverAction : undefined}
                entityFactory={driverFactory}
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