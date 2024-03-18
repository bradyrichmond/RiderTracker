import { Box, Button, Modal, Typography } from "@mui/material"
import { BusType } from "../../types/BusType"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import AddBusModal from "./AddBusModal"
import { createBus, getBuses } from "../../API"
import { RoleContext } from "../../contexts/RoleContext"

const Buses = () => {
    const [isAddingBus, setIsAddingBus] = useState(false)
    const [buses, setBuses] = useState<BusType[]>([])
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateBuses()
    }, [roleContext.token])

    const updateBuses = async () => {
        const newBusesResponse = await getBuses(roleContext.token)
        const newBuses = await newBusesResponse.json()
        setBuses(newBuses)
    }

    const showModal = () => {
        setIsAddingBus(true);
    }

    const hideModal = () => {
        setIsAddingBus(false);
    }

    const createBusAction = async (newBus: BusType) => {
        await createBus(roleContext.token, newBus)
        hideModal()
        updateBuses()
    }

    return (
        <Box height='100%' flexDirection='column'>
            <Modal open={isAddingBus} onClose={hideModal}>
                <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                    <AddBusModal cancelAction={hideModal} submitAction={createBusAction} />
                </Box>
            </Modal>
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    Buses
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                {buses && buses.map((bus) => {
                    return (
                    <Box key={bus.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
                        <Box padding='2rem'>
                            <Typography>{bus.id}</Typography>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{bus.busNumber}</Typography>
                        </Box>
                    </Box>)
                })}
            </Box>
            <Box padding='2rem'>
                <Button onClick={showModal} variant='contained'>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <AddCircleIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Add Bus</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default Buses;