import { Box, Button, Typography, Modal } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RoleContext } from "../../contexts/RoleContext"
import { createGuardianRiderLink, getGuardiansForOrganization, getGuardiansForRider } from "../../API"
import LinkIcon from '@mui/icons-material/Link'
import AddEntityModal, { OptionsType } from "../../components/AddEntityModal"
import { GuardianRiderLinkType } from "../../types/GuardianRiderLinkType"
import { GuardianType } from "../../types/GuardianType"
import { guardianRiderLinkFactory } from "../Guardians/GuardianRiderLinkFactory"
import GuardianRow from "../Guardians/GuardianRow"

interface RidersGuardiansProps {
    organizationId: string
}

const RidersGuardians = ({ organizationId }: RidersGuardiansProps) => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: riderId } = useParams()
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        updateGuardians()
        updateAllGuardians()
    }, [roleContext.token, organizationId])

    const updateGuardians = async () => {
        if (riderId) {
            const guardianData = await getGuardiansForRider(roleContext.token, riderId)
            setGuardians(guardianData)
        }
    }

    const updateAllGuardians = async () => {
        const guardianData = await getGuardiansForOrganization(roleContext.token, organizationId)

        try {
            const mapped = guardianData.map((g: GuardianType) => {
                return { label: `${g.firstName} ${g.lastName}`, id: g.id }
            })
            
            setAllGuardians(mapped)
        } catch {
            setAllGuardians([])
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
        updateGuardians()
    }

    const generateEntity = (entity: GuardianRiderLinkType) => {
        // guardian id is not the sk, but the factory puts it in the sk position
        const args = [entity.id, entity.organizationId, `Rider#${riderId}`, `Guardian#${entity.sk}`]
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
                        { name: "Guardian", inputType: "select", options: allGuardians}
                    ]}}
                />
            </Modal>
            <Typography variant="h2">Guardians</Typography>
            {guardians.length > 0 && guardians.map((g) => <GuardianRow key={g.id} entity={g} />)}
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

export default RidersGuardians