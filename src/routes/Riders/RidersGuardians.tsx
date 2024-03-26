import { Box, Button, Typography, Modal } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { updateRider, updateGuardian, getGuardiansForOrganization, getBulkGuardiansById, getGuardianById } from "../../API"
import { RiderType } from "../../types/RiderType"
import LinkIcon from '@mui/icons-material/Link'
import { GuardianType } from "../../types/GuardianType"
import LinkEntitiesModal from "../../components/LinkEntitiesModal"
import { OptionsType } from "../../types/FormTypes"
import { riderFactory } from "./RiderFactory"
import GuardianRow from "../Guardians/GuardianRow"

interface GuardianRidersProps {
    organizationId: string
    rider: RiderType
    getRiderData(): Promise<void>
}

const GuardiansRiders = ({ organizationId, rider, getRiderData }: GuardianRidersProps) => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: riderId } = rider
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateGuardians()
        updateAllGuardians()
    }, [roleContext.token, organizationId])

    const updateGuardians = async () => {
        await getRiderData()

        if (rider) {
            const guardianData = await getBulkGuardiansById(roleContext.token, rider.guardianRiderLinks)
            setGuardians(guardianData)
        }
    }

    const updateAllGuardians = async () => {
        const guardianData = await getGuardiansForOrganization(roleContext.token, organizationId)

        try {
            const mapped = guardianData.map((r: RiderType) => {
                return { label: `${r.firstName} ${r.lastName}`, id: r.id }
            })
            
            setAllGuardians(mapped)
        } catch {
            setAllGuardians([])
        }
    }

    const toggleShowModal = () => {
        setShowModal((c) => !c)
    }

    const submitAction = async (updatedRider: RiderType) => {
        toggleShowModal()
        await updateRider(roleContext.token, updatedRider)
        const guardianToBeUpdated = updatedRider.guardianRiderLinks.pop()

        if (guardianToBeUpdated) {
            const updatedGuardian = await generateUpdatedGuardian(guardianToBeUpdated)
            await updateGuardian(roleContext.token, updatedGuardian)
        }

        updateGuardians()
    }

    const generateUpdatedGuardian = async (guardianId: string ) => {
        const guardianToUpdate: GuardianType = await getGuardianById(roleContext.token, guardianId)
        guardianToUpdate.guardianRiderLinks.push(riderId)
        const newGuardianRiderLinks = guardianToUpdate.guardianRiderLinks.filter((g: string) => g !== "")
        guardianToUpdate.guardianRiderLinks = newGuardianRiderLinks
        return guardianToUpdate
    }

    const deleteGuardianLink = async (guardianId: string) => {
        await removeGuardianFromRider(guardianId)
        await removeRiderFromGuardian(guardianId)
        updateGuardians()
    }

    const removeGuardianFromRider = async (guardianId: string) => {
        const newRider = rider;
        const newLinks = newRider.guardianRiderLinks.filter((g) => g !== guardianId)
        newRider.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await updateRider(roleContext.token, newRider)
    }

    const removeRiderFromGuardian = async (guardianId: string) => {
        const guardianToUpdate: GuardianType = await getGuardianById(roleContext.token, guardianId)
        const newLinks = guardianToUpdate.guardianRiderLinks.filter((r) => r !== riderId)
        guardianToUpdate.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await updateGuardian(roleContext.token, guardianToUpdate)
    }    

    return (
        <Box>
            <Modal open={showModal} onClose={toggleShowModal} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LinkEntitiesModal<RiderType> 
                    cancelAction={toggleShowModal}
                    entity={rider}
                    entityFactory={riderFactory} 
                    title='Link Rider to a new Guardian'
                    submitAction={submitAction}
                    submitButtonText="Create Link"
                    formDefaultValues={{inputs: [
                        { name: "Guardian", inputType: "select", options: allGuardians}
                    ]}}
                />
            </Modal>
            <Typography variant="h2">Guardians</Typography>
            {guardians.length > 0 ? guardians.map((g) => <GuardianRow key={g.id} entity={g} deleteAction={deleteGuardianLink} />) : <Typography>This rider has no guardians assigned.</Typography>}
            <Box marginTop='2rem'>
                <Button variant='contained' onClick={toggleShowModal}>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <LinkIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Link Guardian to this Rider</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default GuardiansRiders