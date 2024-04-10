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
    const { heaviestRole } = useContext(RoleContext)

    useEffect(() => {
        updateRiders()
        updateAllRiders()
    }, [stopId])

    const updateRiders = async () => {
        await getStopData()

        if (stop && stop.riderIds) {
            const filteredRiderIds = stop.riderIds.filter((r) => r !== "")

            if (filteredRiderIds.length > 0) {
                const riderData = await api.execute(api.riders.getBulkRidersById, [filteredRiderIds])
                setRiders(riderData)
            }
        }
    }

    const updateAllRiders = async () => {
        const riderData = await api.execute(api.riders.getRidersForOrganization, [stop.organizationId])

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
        await api.execute(api.stops.updateStop, [updatedStop])
        if (updatedStop.riderIds) {
            const stopToBeUpdated = updatedStop.riderIds.pop()

            if (stopToBeUpdated) {
                const updatedStop = await generateUpdatedStop(stopToBeUpdated)
                await api.execute(api.stops.updateStop, [updatedStop])
            }

            updateRiders()
        }
    }

    const generateUpdatedStop = async (riderId: string ) => {
        const stopToBeUpdated = stop
        let newRiderIds: string[] = []
        if (stopToBeUpdated.riderIds) {
            newRiderIds = stopToBeUpdated.riderIds.filter((g: string) => g !== "")
        }

        newRiderIds.push(riderId)
        stopToBeUpdated.riderIds = newRiderIds
        return stopToBeUpdated
    }

    const removeRiderFromStop = async (riderId: string) => {
        const newStop = stop;
        if (newStop.riderIds) {
            const newLinks = newStop.riderIds.filter((r) => r !== riderId)
            newStop.riderIds = newLinks.length > 0 ? newLinks : [""]
            await api.execute(api.stops.updateStop, [newStop])
        }
    }

    // @ts-ignore
    const removeStopFromRider = () => {
        // will need to add logic to remove the stop from the rider, as well as update the api and db to handle those
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