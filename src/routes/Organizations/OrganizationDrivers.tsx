import { Box, Button, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { getDriversForOrganization } from "../../API"
import { useNavigate, useParams } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import { DriverType } from "../../types/DriverType"

const OrganizationDrivers = () => {
    const [drivers, setDrivers] = useState<DriverType[]>([])
    const { id: organizationId } = useParams()
    const roleContext = useContext(RoleContext)
    const navigate = useNavigate()

    useEffect(() => {
        updateDrivers()
    }, [roleContext.token, organizationId])

    const updateDrivers = async () => {
        if (organizationId) {
            const driverData = await getDriversForOrganization(roleContext.token, organizationId)
            setDrivers(driverData);
        }
    }
    
    const showDriverDetails = (id: string) => {
        navigate(`/drivers/${id}`)
    }
    
    const deleteRider = (id: string) => {
        console.log(`delete ${id}`)
    }

    return (
        <Box>
            <Typography variant="h2">Drivers</Typography>
            <DataGrid rows={drivers} columns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => showDriverDetails(params.row.id)}
                            >
                            View Details
                        </Button>
                    )
                }},
                { field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteRider(params.row.id)}
                        >
                            <Tooltip title='Delete Guardian?'>
                                <PersonRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }}
            ]} />
        </Box>
    )
}

export default OrganizationDrivers