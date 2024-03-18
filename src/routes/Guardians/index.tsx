import { Box, Button, Modal, Typography } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { GuardianType } from "../../types/GuardianType"
import { createGuardian, getGuardians } from "../../API"
import AddGuardianModal from "./AddGuardianModal"
import { Link } from "react-router-dom"

const Guardians = () => {
    const [isAddingGuardian, setIsAddingGuardian] = useState(false)
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateGuardians()
    }, [roleContext.token])

    const updateGuardians = async () => {
        const newGuardiansResponse = await getGuardians(roleContext.token)
        const newGuardians = await newGuardiansResponse.json()
        setGuardians(newGuardians)
    }

    const showModal = () => {
        setIsAddingGuardian(true);
    }

    const hideModal = () => {
        setIsAddingGuardian(false);
    }

    const createGuardianAction = async (newGuardian: GuardianType) => {
        await createGuardian(roleContext.token, newGuardian)
        hideModal()
        updateGuardians()
    }

    return (
        <Box height='100%' flexDirection='column'>
            <Modal open={isAddingGuardian} onClose={hideModal}>
                <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                    <AddGuardianModal cancelAction={hideModal} submitAction={createGuardianAction} />
                </Box>
            </Modal>
            <Box marginBottom='2rem'>
                <Typography variant='h2'>
                    Guardians
                </Typography>
            </Box>
            <Box flex='1' borderTop='1px solid #000'>
                {guardians && guardians.map((guardian) => {
                    return (
                    <Box key={guardian.id} display='flex' flexDirection='row' borderBottom='1px solid #000'>
                        <Box padding='2rem'>
                            <Link to={`/guardians/${guardian.id}`}><Typography>{guardian.id}</Typography></Link>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{guardian.firstName}</Typography>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{guardian.lastName}</Typography>
                        </Box>
                        <Box padding='2rem'>
                            <Typography>{guardian.organizationId}</Typography>
                        </Box>
                    </Box>)
                })}
            </Box>
            <Box padding='2rem'>
                <Button onClick={showModal} variant='contained'>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <AddCircleIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Add Guardian</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default Guardians;