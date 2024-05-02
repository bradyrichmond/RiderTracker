import { Box, Button, Typography, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { RiderType } from "@/types/RiderType"
import { StopType } from "@/types/StopType"
import { OptionsType } from "@/types/FormTypes"
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from "react-router-dom"
import InfoIcon from '@mui/icons-material/Info'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { ApiContext } from "@/contexts/ApiContextProvider"
import { GridColDef } from "@mui/x-data-grid"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import AssignRidersToStopDialog from "./AssignRidersToStopDialog"

interface StopsRidersProps {
    stop: StopType
    getStopData(): Promise<void>
}

const StopsRiders = ({ stop, getStopData }: StopsRidersProps) => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const [allRiders, setAllRiders] = useState<OptionsType[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const { id: stopId } = stop
    const { api } = useContext(ApiContext)
    const navigate = useNavigate()
    const { heaviestRole, organizationId } = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
        updateAllRiders()
    }, [stopId])

    const updateRiders = async () => {
        await getStopData()

        if (stop && stop.riderIds) {
            const filteredRiderIds = stop.riderIds.filter((r) => r !== "")

            if (filteredRiderIds.length > 0) {
                const riderData = await api.riders.getBulkRidersByIds(organizationId, filteredRiderIds)
                setRiders(riderData)
                return;
            }

            setRiders([])
        }
    }

    const updateAllRiders = async () => {
        const riderData = await api.riders.getRiders(organizationId)

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

    const submitAction = async (updatedStop: StopType) => {
        toggleShowModal()
        await api.stops.updateStop(organizationId, stopId, updatedStop)
    }

    const removeRiderFromStop = async (riderId: string) => {
        const stopToUpdate = stop;
        if (stopToUpdate.riderIds) {
            const newLinks = stopToUpdate.riderIds.filter((r) => r !== riderId)
            stopToUpdate.riderIds = newLinks.length > 0 ? newLinks : [""]
            await api.stops.updateStop(organizationId, stopId, stopToUpdate)
            updateRiders()
        }
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

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.REMOVE_RIDER_FROM_STOP)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => removeRiderFromStop(params.row.id)}
                        >
                            <Tooltip title='Remove Rider from Stop'>
                                <PersonRemoveIcon />
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
            {allRiders.length > 0 ? 
                <AssignRidersToStopDialog 
                    cancelAction={toggleShowModal}
                    entity={stop}
                    title={`Assign Rider to ${stop.stopName}`}
                    submitAction={submitAction}
                    submitButtonText="Submit"
                    stopName={stop.stopName}
                    formDefaultValues={{inputs: [
                        { name: "Rider", inputType: "select", options: allRiders}
                    ]}}
                    open={showModal}
                />
            :
                null
            }
            <Typography variant="h2">{stop.stopName} Riders</Typography>
            <DataGrid hideFooterPagination autoHeight rows={riders} columns={generateGridColumns()} />
            {RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.ADD_RIDER_TO_STOP) && allRiders.length > 0 ?
                <Box marginTop='2rem'>
                    <Button variant='contained' onClick={toggleShowModal}>
                        <Box display='flex' flexDirection='row' justifyContent=''>
                            <PersonAddIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>Assign a Rider to {stop.stopName}</Typography>
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

export default StopsRiders