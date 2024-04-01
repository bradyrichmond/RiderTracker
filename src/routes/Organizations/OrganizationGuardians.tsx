import { Box, Button, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { GuardianType } from "../../types/GuardianType"
import { DataGrid } from '@mui/x-data-grid'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "../../contexts/ApiContext"

const OrganizationGuardians = () => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const { id: organizationId } = useParams()
    const roleContext = useContext(RoleContext)
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        updateGuardians()
    }, [roleContext, organizationId])

    const updateGuardians = async () => {
        if (organizationId) {
            const guardianData = await api.execute(api.guardians.getGuardiansForOrganization, [organizationId])
            setGuardians(guardianData);
        }
    }
    
    const showGuardianDetails = (id: string) => {
        navigate(`/guardians/${id}`)
    }
    
    const deleteGuardianAction = async (id: string) => {
        await api.execute(api.guardians.deleteGuardian, [id])
        updateGuardians()
    }

    return (
        <Box minHeight='300px'>
            <Typography variant="h2">Guardians</Typography>
            <DataGrid hideFooterPagination autoHeight rows={guardians} columns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => showGuardianDetails(params.row.id)}
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
                            onClick={() => deleteGuardianAction(params.row.id)}
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

export default OrganizationGuardians