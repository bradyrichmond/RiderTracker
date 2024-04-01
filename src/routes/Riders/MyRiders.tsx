import EntityViewer from "../../components/EntityViewer"
import { useNavigate, useParams } from 'react-router-dom'
import { RiderType } from "../../types/RiderType"
import { riderFactory } from "./RiderFactory"
import { Box, Button, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useState } from "react"
import { GuardianType } from "../../types/GuardianType"
import { ApiContext } from "../../contexts/ApiContextProvider"

const MyRiders = () => {
    const { id } = useParams()
    const [riders, setRiders] = useState<RiderType[]>([])
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)

    const getRidersAction = async () => {
        const guardianData: GuardianType = await api.execute(api.guardians.getGuardianById, [id])
        const riders = await api.execute(api.riders.getBulkRidersById ,[guardianData.guardianRiderLinks])
        setRiders(riders)
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const createRider = async (_newRider: RiderType) => {
        console.error(`You're not allowed to do that, Dave.`)
    }
    
    return (
        <Box height='100%'>
            <EntityViewer<RiderType>
                createEntity={createRider}
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