import { Box, Button, Typography, Modal } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RoleContext } from "../../contexts/RoleContext"
import { createGuardianRiderLink, getRidersForGuardian, getRidersForOrganization } from "../../API"
import { RiderType } from "../../types/RiderType"
import RiderRow from "../Riders/RiderRow"
import LinkIcon from '@mui/icons-material/Link';
import AddEntityModal, { OptionsType } from "../../components/AddEntityModal"
import { guardianRiderLinkFactory } from "./GuardianRiderLinkFactory"
import { GuardianRiderLinkType } from "../../types/GuardianRiderLinkType"

interface GuardianRidersProps {
    organizationId: string
}

const GuardiansRiders = ({ organizationId }: GuardianRidersProps) => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const [allRiders, setAllRiders] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: guardianId } = useParams()
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
        updateAllRiders()
    }, [roleContext.token, organizationId])

    const updateRiders = async () => {
        if (guardianId) {
            const riderData = await getRidersForGuardian(roleContext.token, guardianId)
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

    const submitAction = async (badEntity: GuardianRiderLinkType) => {
        toggleShowModal()
        // fix entity generation
        const newEntity = generateEntity(badEntity)
        await createGuardianRiderLink(roleContext.token, newEntity)
        updateRiders()
    }

    const generateEntity = (entity: GuardianRiderLinkType) => {
        const args = [entity.id, entity.organizationId, `Rider#${entity.sk}`, `Guardian#${guardianId}`]
        return guardianRiderLinkFactory(args)
    }

    return (
        <Box>
            <Modal open={showModal} onClose={toggleShowModal} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AddEntityModal<GuardianRiderLinkType> 
                    organizationId={organizationId}
                    cancelAction={toggleShowModal}
                    entityFactory={guardianRiderLinkFactory} 
                    titleSingular='Guardian Rider Link'
                    submitAction={submitAction}
                    formDefaultValues={{inputs: [
                        { name: "Organization Id", inputType: "select" },
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