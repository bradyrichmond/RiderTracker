import { Box, Button, Modal, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { RiderType } from "../../types/RiderType"
import { createRider, getRiders } from "../../API"
import AddRiderModal from "./AddRiderModal"
import { Link } from "react-router-dom"

const Riders = () => {
    const [isAddingRider, setIsAddingRider] = useState(false)
    const [riders, setRiders] = useState<RiderType[]>([])
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
    }, [roleContext.token])

    const updateRiders = async () => {
        const newRidersResponse = await getRiders(roleContext.token)
        const newRiders = await newRidersResponse.json()
        setRiders(newRiders)
    }

    const showModal = () => {
        setIsAddingRider(true);
    }

    const hideModal = () => {
        setIsAddingRider(false);
    }

    const createRiderAction = async (newRider: RiderType) => {
        await createRider(roleContext.token, newRider)
        hideModal()
        updateRiders()
    }

    return (
        <Box height='100%' flexDirection='column'>
            <Modal open={isAddingRider} onClose={hideModal}>
                <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                    <AddRiderModal cancelAction={hideModal} submitAction={createRiderAction} />
                </Box>
            </Modal>
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    Riders
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                {riders && riders.map((rider) => {
                    return (
                    <Box key={rider.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
                        <Box padding='2rem'>
                            <Link to={`/riders/${rider.id}`}><Typography>{rider.id}</Typography></Link>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{rider.firstName}</Typography>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{rider.lastName}</Typography>
                        </Box>
                    </Box>)
                })}
            </Box>
            <Box padding='2rem'>
                <Button onClick={showModal} variant='contained'>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <AddCircleIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Add Rider</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default Riders;