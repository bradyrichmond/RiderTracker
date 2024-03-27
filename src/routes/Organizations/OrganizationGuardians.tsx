import { Box, Button, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { getGuardiansForOrganization } from "../../API"
import { useNavigate, useParams } from "react-router-dom"
import { GuardianType } from "../../types/GuardianType"
import { DataGrid } from '@mui/x-data-grid'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

const OrganizationGuardians = () => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const { id: organizationId } = useParams()
    const roleContext = useContext(RoleContext)
    const navigate = useNavigate()

    useEffect(() => {
        updateGuardians()
    }, [roleContext.token, organizationId])

    const updateGuardians = async () => {
        if (organizationId) {
            const guardianData = await getGuardiansForOrganization(roleContext.token, organizationId)
            setGuardians(guardianData);
        }
    }
    
    const showGuardianDetails = (id: string) => {
        navigate(`/guardians/${id}`)
    }
    
    const deleteGuardian = (id: string) => {
        console.log(`delete ${id}`)
    }

    return (
        <Box>
            <Typography variant="h2">Guardians</Typography>
            <DataGrid rows={guardians} columns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => showGuardianDetails(params.row.id)}
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
                            onClick={() => deleteGuardian(params.row.id)}
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