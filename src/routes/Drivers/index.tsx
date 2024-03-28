import { createDriver, deleteDriver, getDrivers, getDriversForOrganization } from "../../API"
import EntityViewer from "../../components/EntityViewer"
import { useNavigate, useParams } from 'react-router-dom'
import { DriverType } from "../../types/DriverType"
import { driverFactory } from "./DriverFactory"
import { useContext, useState } from "react"
import { Button, Tooltip } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { RoleContext } from "../../contexts/RoleContext"

interface DriversProps {
    fetchForOrg?: boolean
}

const Drivers = ({ fetchForOrg }: DriversProps) => {
    const [drivers, setDrivers] = useState<DriverType[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    const getDriversFunction = (fetchForOrg && id) ? getDriversForOrganization : getDrivers
    const roleContext = useContext(RoleContext)

    const updateDriversAction = async () => {
        const drivers = await getDriversFunction(roleContext.token, id ?? '')
        setDrivers(drivers)
    }

    const viewDriverDetails = (driverId: string) => {
        navigate(`/drivers/${driverId}`)
    }

    const deleteDriverAction = async (driverId: string) => {
        await deleteDriver(roleContext.token, driverId)
        updateDriversAction()
    }
    
    return (
        <EntityViewer<DriverType>
            createEntity={createDriver}
            entityFactory={driverFactory}
            getEntities={updateDriversAction}
            entities={drivers}
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
                            onClick={() => viewDriverDetails(params.row.id)}
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
                            onClick={() => deleteDriverAction(params.row.id)}
                        >
                            <Tooltip title='Delete Guardian'>
                                <PersonRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }}
            ]}
            titleSingular='Driver'
            titlePlural='Drivers'
        />
    )
}

export default Drivers