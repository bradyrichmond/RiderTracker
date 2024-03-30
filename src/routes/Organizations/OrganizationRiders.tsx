import { Box, Button, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { RiderType } from "../../types/RiderType"
import { useNavigate, useParams } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "../../contexts/ApiContext"

const OrganizationRiders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const { id: organizationId } = useParams()
    const navigate = useNavigate()
    const roleContext = useContext(RoleContext)
    const { api } = useContext(ApiContext)

    useEffect(() => {
        updateRiders()
    }, [roleContext, organizationId])

    const updateRiders = async () => {
        if (organizationId) {
            const riderData = await api.execute(api.riders.getRidersForOrganization, [organizationId])
            setRiders(riderData);
        }
    }

    const showRiderDetails = (id: string) => {
        navigate(`/riders/${id}`)
    }

    const deleteRiderAction = async (id: string) => {
        await api.execute(api.riders.deleteRider, [id])
        updateRiders()
    }

    return (
        <Box minHeight='300px'>
            <Typography variant="h2">Riders</Typography>
            <DataGrid hideFooterPagination autoHeight rows={riders} columns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => showRiderDetails(params.row.id)}
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
                            onClick={() => deleteRiderAction(params.row.id)}
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