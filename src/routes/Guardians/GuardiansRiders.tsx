import { Box, Button, Typography, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { RiderType } from "@/types/RiderType"
// import LinkIcon from '@mui/icons-material/Link'
// import LinkEntitiesModal from "@/components/LinkEntitiesModal"
// import { OptionsType } from "@/types/FormTypes"
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom"
import LinkOffIcon from '@mui/icons-material/LinkOff'
import InfoIcon from '@mui/icons-material/Info'
import { ApiContext } from "@/contexts/ApiContextProvider"
import { GridColDef } from "@mui/x-data-grid"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import { GuardianType } from "@/types/UserType"

interface RidersGuardiansProps {
    guardian: GuardianType
    getGuardianData(): Promise<void>
}

const GuardiansRiders = ({ guardian, getGuardianData }: RidersGuardiansProps) => {
    const [riders, setRiders] = useState<RiderType[]>([])
    // const [allRiders, setAllRiders] = useState<OptionsType[]>([])
    // const [showModal, setShowModal] = useState<boolean>(false)
    const { id: guardianId } = guardian
    const roleContext = useContext(RoleContext)
    const { api } = useContext(ApiContext)
    const navigate = useNavigate()
    const { heaviestRole, organizationId } = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
        // updateAllRiders()
    }, [roleContext, guardian.orgId])

    const updateRiders = async () => {
        await getGuardianData()

        if (guardian) {
            const filteredGuardianRiderLinks = guardian.riderIds.filter((g) => g !== "")

            if (filteredGuardianRiderLinks.length > 0) {
                const riderData = await api.riders.getBulkRidersByIds(organizationId, filteredGuardianRiderLinks)
                setRiders(riderData)
            }
        }
    }

    // const updateAllRiders = async () => {
    //     const riderData = await api.riders.getRiders(organizationId)

    //     try {
    //         const mapped = riderData.map((r: RiderType) => {
    //             return { label: `${r.firstName} ${r.lastName}`, id: r.id }
    //         })
            
    //         setAllRiders(mapped)
    //     } catch {
    //         setAllRiders([])
    //     }
    // }

    // const toggleShowModal = () => {
    //     setShowModal((c) => !c)
    // }

    // const submitAction = async (addedRiderId: string) => {
    //     toggleShowModal()
    //     await api.users.updateUser(organizationId, guardianId, { riderIds: [...guardian.riderIds, addedRiderId] })

    //     updateRiders()
    // }

    const deleteGuardianLink = async (riderId: string) => {
        await removeRiderFromGuardian(riderId)
        updateRiders()
    }

    const removeRiderFromGuardian = async (riderId: string) => {
        const newGuardian = guardian;
        const newLinks = newGuardian.riderIds.filter((r) => r !== riderId)
        newGuardian.riderIds = newLinks.length > 0 ? newLinks : [""]
        await api.users.updateUser(organizationId, guardianId, { riderIds: newGuardian.riderIds })
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
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
                        onClick={() => viewRiderDetails(params.row.id)}
                    >
                        <Tooltip title='View Details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.LINK_GUARDIAN_TO_RIDER)) {
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
            {/* {allRiders.length > 0 ? 
                <LinkEntitiesModal<RiderType> 
                    cancelAction={toggleShowModal}
                    entity={guardian} 
                    title='Link Guardian to a new Rider'
                    submitAction={submitAction}
                    submitButtonText="Create Link"
                    open={showModal}
                    options={allRiders}
                />
            :
                null
            } */}
            <Typography variant="h2">Riders</Typography>
            <DataGrid hideFooterPagination autoHeight rows={riders} columns={generateGridColumns()} />
            {/* {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.LINK_GUARDIAN_TO_RIDER) ?
                <Box marginTop='2rem'>
                    <Button variant='contained' onClick={toggleShowModal}>
                        <Box display='flex' flexDirection='row' justifyContent=''>
                            <LinkIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>Link another Rider to this Guardian</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
                :
                null
            } */}
        </Box>
    )
}

export default GuardiansRiders