import { Box, Button, Modal, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import AddDriverModal from "./AddDriverModal"
import { createDriver, getDrivers } from "../../API"
import { RoleContext } from "../../contexts/RoleContext"
import { DriverType } from "../../types/DriverType"

const Drivers = () => {
    const [isAddingDriver, setIsAddingDriver] = useState(false)
    const [drivers, setDrivers] = useState<DriverType[]>([])
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateDrivers()
    }, [roleContext.token])

    const updateDrivers = async () => {
        const newDriversResponse = await getDrivers(roleContext.token)
        const newDrivers = await newDriversResponse.json()
        setDrivers(newDrivers)
    }

    const showModal = () => {
        setIsAddingDriver(true);
    }

    const hideModal = () => {
        setIsAddingDriver(false);
    }

    const createDriverAction = async (newDriver: DriverType) => {
        await createDriver(roleContext.token, newDriver)
        hideModal()
        updateDrivers()
    }

    return (
        <Box height='100%' flexDirection='column'>
            <Modal open={isAddingDriver} onClose={hideModal}>
                <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                    <AddDriverModal cancelAction={hideModal} submitAction={createDriverAction} />
                </Box>
            </Modal>
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    Drivers
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                {drivers && drivers.map((driver) => {
                    return (
                    <Box key={driver.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
                        <Box padding='2rem'>
                            <Typography>{driver.id}</Typography>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{driver.firstName}</Typography>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{driver.lastName}</Typography>
                        </Box>
                    </Box>)
                })}
            </Box>
            <Box padding='2rem'>
                <Button onClick={showModal} variant='contained'>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <AddCircleIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Add Driver</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default Drivers;