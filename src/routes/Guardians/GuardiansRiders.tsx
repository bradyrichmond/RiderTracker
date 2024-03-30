import { Box, Button, Typography, Modal, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContext"
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
import { ApiContext } from "../../contexts/ApiContext"

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
    const { api } = useContext(ApiContext)
    const navigate = useNavigate()

    useEffect(() => {
        updateRiders()
        updateAllRiders()
    }, [roleContext, organizationId])

    const updateRiders = async () => {
        await getGuardianData()

        if (guardian) {
            const riderData = await api.execute(api.riders.getBulkRidersById, guardian.guardianRiderLinks)
            setRiders(riderData)
        }
    }

    const updateAllRiders = async () => {
        const riderData = await api.execute(api.riders.getRidersForOrganization, [organizationId])

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
        await api.execute(api.guardians.updateGuardian, [updatedGuardian])
        const riderToBeUpdated = updatedGuardian.guardianRiderLinks.pop()

        if (riderToBeUpdated) {
            const updatedRider = await generateUpdatedRider(riderToBeUpdated)
            await api.execute(api.riders.updateRider, [updatedRider])
        }

        updateRiders()
    }

    const generateUpdatedRider = async (riderId: string ) => {
        const riderToBeUpdated: RiderType = await api.execute(api.riders.getRiderById, [riderId])
        riderToBeUpdated.guardianRiderLinks.push(riderId)
        const newGuardianRiderLinks = riderToBeUpdated.guardianRiderLinks.filter((g: string) => g !== "")
        riderToBeUpdated.guardianRiderLinks = newGuardianRiderLinks
        return riderToBeUpdated
    }

    const deleteGuardianLink = async (riderId: string) => {
        await removeGuardianFromRider(riderId)
        await removeRiderFromGuardian(riderId)
        updateRiders()
    }

    const removeRiderFromGuardian = async (riderId: string) => {
        const newGuardian = guardian;
        const newLinks = newGuardian.guardianRiderLinks.filter((r) => r !== riderId)
        newGuardian.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await api.execute(api.guardians.updateGuardian, [newGuardian])
    }

    const removeGuardianFromRider = async (riderId: string) => {
        const riderToBeUpdated: RiderType = await api.execute(api.riders.getRiderById, [riderId])
        const newLinks = riderToBeUpdated.guardianRiderLinks.filter((g) => g !== guardianId)
        riderToBeUpdated.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await api.execute(api.riders.updateRider, [riderToBeUpdated])
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