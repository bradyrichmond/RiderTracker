import { Box, Button, Typography, Modal } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { getRiderById, getBulkRidersById, getRidersForOrganization, updateRider, updateGuardian } from "../../API"
import { RiderType } from "../../types/RiderType"
import RiderRow from "../Riders/RiderRow"
import LinkIcon from '@mui/icons-material/Link'
import { GuardianType } from "../../types/GuardianType"
import LinkEntitiesModal from "../../components/LinkEntitiesModal"
import { guardianFactory } from "./GuardianFactory"
import { OptionsType } from "../../types/FormTypes"

interface GuardianRidersProps {
    organizationId: string,
    guardian: GuardianType
}

const GuardiansRiders = ({ organizationId, guardian }: GuardianRidersProps) => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const [allRiders, setAllRiders] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: guardianId } = guardian
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
        updateAllRiders()
    }, [roleContext.token, organizationId])

    const updateRiders = async () => {
        if (guardianId) {
            // Make sure there are no empty strings in the existing links
            const filteredRiderIds = guardian.guardianRiderLinks.filter((r) => r !== "")
            const riderData = await getBulkRidersById(roleContext.token, filteredRiderIds)
            setRiders(riderData)
        }
    }

    const updateAllRiders = async () => {
        const riderData = await getRidersForOrganization(roleContext.token, organizationId)

        try {
            const mapped = riderData.map((r: RiderType) => {
                return { label: `${r.firstName} ${r.lastName}`, id: r.id }
            })
            
            setAllRiders(mapped)
        } catch {
            setAllRiders([])
        }
    }

    const toggleShowModal = () => {
        setShowModal((c) => !c)
    }

    const submitAction = async (updatedGuardian: GuardianType) => {
        toggleShowModal()
        await updateGuardian(roleContext.token, updatedGuardian)
        const riderToBeUpdated = updatedGuardian.guardianRiderLinks.pop();

        if (riderToBeUpdated) {
            const updatedRider = await generateUpdatedRider(riderToBeUpdated)
            await updateRider(roleContext.token, updatedRider)
        }

        updateRiders()
    }

    const generateUpdatedRider = async (riderId: string) => {
        const riderToUpdate = await getRiderById(roleContext.token, riderId)
        riderToUpdate.guardianRiderLinks.push(guardianId)
        const newGuardianRiderLinks = riderToUpdate.filter((r: string) => r !== "")
        riderToUpdate.guardianRiderLinks = newGuardianRiderLinks
        return riderToUpdate
    }

    return (
        <Box>
            <Modal open={showModal} onClose={toggleShowModal} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LinkEntitiesModal<GuardianType> 
                    cancelAction={toggleShowModal}
                    entity={guardian}
                    entityFactory={guardianFactory} 
                    title='Link Guardian to a new Rider'
                    submitAction={submitAction}
                    submitButtonText="Create Link"
                    formDefaultValues={{inputs: [
                        { name: "Rider", inputType: "select", options: allRiders}
                    ]}}
                />
            </Modal>
            <Typography variant="h2">Riders</Typography>
            {riders.length > 0 && riders.map((r) => <RiderRow key={r.id} entity={r} />)}
            <Box marginTop='2rem'>
                <Button variant='contained' onClick={toggleShowModal}>
                    <Box display='flex' flexDirection='row' justifyContent=''>
                        <LinkIcon />
                        <Box flex='1' marginLeft='1rem'>
                            <Typography>Link Rider to this Guardian</Typography>
                        </Box>
                    </Box>
                </Button>
            </Box>
        </Box>
    )
}

export default GuardiansRiders