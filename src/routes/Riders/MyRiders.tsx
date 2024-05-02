import EntityViewer from "../../components/EntityViewer"
import { useNavigate } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { riderFactory } from "./RiderFactory"
import { Box, Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { ApiContext } from "../../contexts/ApiContextProvider"
import { GuardianType } from "@/types/UserType"
import { RoleContext } from "@/contexts/RoleContextProvider"

const MyRiders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { organizationId, userId } = useContext(RoleContext)

    const getRidersAction = async () => {
        const guardianData: GuardianType = await api.users.getGuardianById(organizationId, userId)
        const riders = await api.riders.getBulkRidersByIds(organizationId, guardianData.riderIds)
        setRiders(riders)
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }
    
    return (
        <Box height='100%'>
            <EntityViewer<RiderType>
                entityFactory={riderFactory}
                getEntities={getRidersAction}
                entities={riders}
                gridColumns={[
                    { field: 'firstName',  headerName: 'First Name', flex: 1},
                    { field: 'lastName',  headerName: 'Last Name', flex: 1},
                    { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                        return (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => viewRiderDetails(params.row.id)}
                            >
                                <Tooltip title='Delete Guardian?'>
                                    <InfoIcon />
                                </Tooltip>
                            </Button>
                        )
                    }}
                ]}
            />
        </Box>
    )
}

export default MyRiders