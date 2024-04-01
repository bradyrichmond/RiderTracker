import EntityViewer from "../../components/EntityViewer"
import { useNavigate, useParams } from 'react-router-dom'
import { DriverType } from "../../types/DriverType"
import { driverFactory } from "./DriverFactory"
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GridColDef } from '@mui/x-data-grid'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"
import { RoleContext } from "../../contexts/RoleContextProvider"

interface DriversProps {
    fetchForOrg?: boolean
}

const Drivers = ({ fetchForOrg }: DriversProps) => {
    const [drivers, setDrivers] = useState<DriverType[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const getDriversFunction = (fetchForOrg && id) ? api.drivers.getDriversForOrganization : api.drivers.getDrivers

    const updateDriversAction = async () => {
        const drivers = await api.execute(getDriversFunction, [id ?? ''])
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
        return await api.execute(api.drivers.createDriver, [driver])
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
        <EntityViewer<DriverType>
            createEntity={RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.CREATE_DRIVER) ? createDriverAction : undefined}
            entityFactory={driverFactory}
            getEntities={updateDriversAction}
            entities={drivers}
            modalFormInputs={{inputs: [
                { name: "Organization Id", inputType: "select" },
                { name: "First Name" },
                { name: "Last Name" }
            ]}}
            gridColumns={generateGridColumns()}
            titleSingular='Driver'
            titlePlural='Drivers'
        />
    )
}

export default Drivers