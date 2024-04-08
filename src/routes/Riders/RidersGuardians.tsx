import { Box, Button, Typography, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { RiderType } from "../../types/RiderType"
import LinkIcon from '@mui/icons-material/Link'
import { GuardianType } from "../../types/GuardianType"
import LinkEntitiesModal from "../../components/LinkEntitiesModal"
import { OptionsType } from "../../types/FormTypes"
import { riderFactory } from "./RiderFactory"
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom"
import LinkOffIcon from '@mui/icons-material/LinkOff'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "../../contexts/ApiContextProvider"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "../../constants/Roles"
import { GridColDef } from "@mui/x-data-grid"

interface GuardianRidersProps {
    rider: RiderType
    getRiderData(): Promise<void>
}

const GuardiansRiders = ({ rider, getRiderData }: GuardianRidersProps) => {
    const [guardians, setGuardians] = useState<GuardianType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: riderId } = rider
    const { heaviestRole } = useContext(RoleContext)
    const { api } = useContext(ApiContext)
    const navigate = useNavigate()

    useEffect(() => {
        updateGuardians()
        updateAllGuardians()
    }, [heaviestRole, rider.organizationId])

    const updateGuardians = async () => {
        await getRiderData()

        if (rider) {
            const filteredGuardianRiderLinks = rider.guardianRiderLinks.filter((l) => l !== "")
            const guardianData = await api.execute(api.guardians.getBulkGuardiansById, filteredGuardianRiderLinks)
            setGuardians(guardianData)
        }
    }

    const updateAllGuardians = async () => {
        const guardianData = await api.execute(api.guardians.getGuardiansForOrganization, [rider.organizationId])

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
        await api.execute(api.riders.updateRider, [updatedRider])
        const guardianToBeUpdated = updatedRider.guardianRiderLinks.pop()

        if (guardianToBeUpdated) {
            const updatedGuardian = await generateUpdatedGuardian(guardianToBeUpdated)
            await api.execute(api.guardians.updateGuardian, [updatedGuardian])
        }

        updateGuardians()
    }

    const generateUpdatedGuardian = async (guardianId: string ) => {
        const guardianToUpdate: GuardianType = await api.execute(api.guardians.getGuardianById, [guardianId])
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
        await api.execute(api.riders.updateRider, [newRider])
    }

    const removeRiderFromGuardian = async (guardianId: string) => {
        const guardianToUpdate: GuardianType = await api.execute(api.guardians.getGuardianById, [guardianId])
        const newLinks = guardianToUpdate.guardianRiderLinks.filter((r) => r !== riderId)
        guardianToUpdate.guardianRiderLinks = newLinks.length > 0 ? newLinks : [""]
        await api.execute(api.guardians.updateGuardian, [guardianToUpdate])
    }

    const viewGuardianDetails = (guardianId: string) => {
        navigate(`/guardians/${guardianId}`)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1},
            { field: 'lastName',  headerName: 'Last Name', flex: 1},
            { field: 'viewDetails', headerName: '', flex: 1, renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewGuardianDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.UNLINK_RIDER_FROM_GUARDIAN)) {
            initialGridColumns.push({ 
                field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
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
                }
            })
        }

        return initialGridColumns
    }

    return (
        <Box>
            {allGuardians.length > 0 ?
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
                    open={showModal}
                />
                :
                null
            }
            <Typography variant="h2">Guardians</Typography>
            <DataGrid hideFooterPagination autoHeight rows={guardians} columns={generateGridColumns()} />
            {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.LINK_RIDER_TO_GUARDIAN) ?
                <Box marginTop='2rem'>
                    <Button variant='contained' onClick={toggleShowModal}>
                        <Box display='flex' flexDirection='row' justifyContent=''>
                            <LinkIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>Link another Guardian to this Rider</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
                : 
                null
            }
        </Box>
    )
}

export default GuardiansRiders