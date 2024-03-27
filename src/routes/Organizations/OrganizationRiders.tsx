import { Box, Button, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { getRidersForOrganization } from "../../API"
import { RiderType } from "../../types/RiderType"
import { useNavigate, useParams } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

const OrganizationRiders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const { id: organizationId } = useParams()
    const navigate = useNavigate()
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
    }, [roleContext.token, organizationId])

    const updateRiders = async () => {
        if (organizationId) {
            const riderData = await getRidersForOrganization(roleContext.token, organizationId)
            setRiders(riderData);
        }
    }

    const showRiderDetails = (id: string) => {
        navigate(`/riders/${id}`)
    }

    const deleteRider = (id: string) => {
        console.log(`Deleting rider ${id}`)
    }

    return (
        <Box>
            <Typography variant="h2">Riders</Typography>
            <DataGrid rows={riders} columns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => showRiderDetails(params.row.id)}
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

export default OrganizationRiders