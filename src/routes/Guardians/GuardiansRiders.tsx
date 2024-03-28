import { Box, Button, Typography, Modal, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
import { updateRider, updateGuardian, getRidersForOrganization, getBulkRidersById, getRiderById } from "../../API"
import { RiderType } from "../../types/RiderType"
import LinkIcon from '@mui/icons-material/Link'
import { GuardianType } from "../../types/GuardianType"
import LinkEntitiesModal from "../../components/LinkEntitiesModal"
import { OptionsType } from "../../types/FormTypes"
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom"
import LinkOffIcon from '@mui/icons-material/LinkOff'
import InfoIcon from '@mui/icons-material/Info'
import { guardianFactory } from "./GuardianFactory"

interface RidersGuardiansProps {
    organizationId: string
    guardian: GuardianType
    getGuardianData(): Promise<void>
}

const GuardiansRiders = ({ organizationId, guardian, getGuardianData }: RidersGuardiansProps) => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const [allRiders, setAllRiders] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: guardianId } = guardian
    const roleContext = useContext(RoleContext)
    const navigate = useNavigate()

    useEffect(() => {
        updateRiders()
        updateAllRiders()
    }, [roleContext.token, organizationId])

    const updateRiders = async () => {
        await getGuardianData()

        if (guardian) {
            const riderData = await getBulkRidersById(roleContext.token, guardian.guardianRiderLinks)
            setRiders(riderData)
        }
    }

    const updateAllRiders = async () => {
        const riderData = await getRidersForOrganization(roleContext.token, organizationId)

        try {
            const mapped = riderData.map((r: GuardianType) => {
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
        const riderToBeUpdated = updatedGuardian.guardianRiderLinks.pop()

        if (riderToBeUpdated) {
            const updatedRider = await generateUpdatedRider(riderToBeUpdated)
            await updateRider(roleContext.token, updatedRider)
        }

        updateRiders()
    }

    const generateUpdatedRider = async (riderId: string ) => {
        const riderToBeUpdated: RiderType = await getRiderById(roleContext.token, riderId)
        riderToBeUpdated.guardianRiderLinks.push(riderId)
        const newGuardianRiderLinks = riderToBeUpdated.guardianRiderLinks.filter((g: string) => g !== "")
        riderToBeUpdated.guardianRiderLinks = newGuardianRiderLinks
        return riderToBeUpdated
    }

    const deleteGuardianLink = async (guardianId: string) => {
        await removeGuardianFromRider(guardianId)
        await removeRiderFromGuardian(guardianId)
        updateRiders()
    }

    const removeRiderFromGuardian = async (riderId: string) => {
        const newGuardian = guardian;
        const newLinks = newGuardian.guardianRiderLinks.filter((r) => r !== riderId)
        newGuardian.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await updateRider(roleContext.token, newGuardian)
    }

    const removeGuardianFromRider = async (riderId: string) => {
        const riderToBeUpdated: RiderType = await getRiderById(roleContext.token, riderId)
        const newLinks = riderToBeUpdated.guardianRiderLinks.filter((g) => g !== guardianId)
        riderToBeUpdated.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await updateRider(roleContext.token, riderToBeUpdated)
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    return (
        <Box>
            <Modal open={showModal} onClose={toggleShowModal} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LinkEntitiesModal<RiderType> 
                    cancelAction={toggleShowModal}
                    entity={guardian}
                    entityFactory={guardianFactory} 
                    title='Link Guardian to a new Rider'
                    submitAction={submitAction}
                    submitButtonText="Create Link"
                    formDefaultValues={{inputs: [
                        { name: "Guardian", inputType: "select", options: allRiders}
                    ]}}
                />
            </Modal>
            <Typography variant="h2">Riders</Typography>
            <DataGrid hideFooterPagination autoHeight rows={riders} columns={[
                { field: 'firstName',  headerName: 'First Name', flex: 1},
                { field: 'lastName',  headerName: 'Last Name', flex: 1},
                { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => viewRiderDetails(params.row.id)}
                        >
                            <Tooltip title='View Details'>
                                <InfoIcon />
                            </Tooltip>
                        </Button>
                    )
                }},
                { field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteGuardianLink(params.row.id)}
                        >
                            <Tooltip title='Remove guardian from rider'>
                                <LinkOffIcon />
                            </Tooltip>
                        </Button>
                    )
                }}
            ]} />
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