import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, Typography } from "@mui/material"
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from "@/constants/Roles"
import InfoIcon from '@mui/icons-material/Info'
import WrongLocationIcon from '@mui/icons-material/WrongLocation'
import { RoleContext } from "@/contexts/RoleContextProvider"
import { StopType } from "@/types/StopType"
import { ApiContext } from "@/contexts/ApiContextProvider"
import { v4 as uuid } from 'uuid'
import { Transition } from "@/components/AddEntityModal"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm } from "react-hook-form"
import { useTranslation } from 'react-i18next'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { useRandomNameGenerator } from "@/hooks/useRandomNameGenerator"
import { SnackbarContext } from "@/contexts/SnackbarContextProvider"
import { OrgDataContext } from "@/contexts/OrgDataContext"

const Stops = () => {
    const [stops, setStops] = useState<StopType[]>([])
    const [isAddingStop, setIsAddingStop] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const [newStopId, setNewStopId] = useState('')
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const { handleSubmit, register, reset } = useForm<StopType>()
    const { t } = useTranslation('stops')
    const { randomName, generateRandomName } = useRandomNameGenerator()

    useEffect(() => {
        const nextStopId = uuid()
        setNewStopId(nextStopId)
        updateStops()
    }, [orgId])

    const updateRandomName = () => {
        generateRandomName()
    }

    const updateStops = async () => {
        const fetchedStops = await api.stops.getStops(orgId)
        setStops(fetchedStops)
    }

    const createStopAction = async (newStop: StopType) => {
        setDisableButtons(true)
        const validStop = newStop
        validStop.riderIds = [""]

        const validatedAddress = await api.addresses.validateAddress(newStop.address)
        if (validatedAddress) {
            await api.stops.createStop(orgId, validStop)
            const nextStopId = uuid()
            setNewStopId(nextStopId)
            reset()
            setDisableButtons(false)
            updateStops()
        } else {
            showErrorSnackbar('Adding Stop failed due to invalid address.')
        }

    }

    const deleteStopAction = async (id: string) => {
        await api.stops.deleteStop(orgId, id)
        updateStops()
    }

    const viewStopDetails = (id: string) => {
        navigate(`/stops/${id}`)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns:GridColDef[] = [
            { field: 'stopName',  headerName: 'Stop Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'address',  headerName: 'Address', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'riderIds', headerName: 'Riders', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value: string[]) => value.length },
            { field: 'viewDetails', headerName: 'Actions', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => viewStopDetails(params.row.id)}
                    >
                        <Tooltip title='View details'>
                            <InfoIcon />
                        </Tooltip>
                    </Button>
                )
            }}
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_STOP)) {
            initialGridColumns.push({ 
                field: 'delete',
                headerName: '',
                flex: 1,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteStopAction(params.row.id)}
                        >
                            <Tooltip title='Delete Stop?'>
                                <WrongLocationIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: StopType) => {
        return updatedRow
    }

    const startAddingStop = () => {
        setIsAddingStop(true)
    }

    const cancelAction = () => {
        setIsAddingStop(false)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Dialog
                open={isAddingStop}
                onClose={cancelAction}
                TransitionComponent={Transition}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(createStopAction),
                    sx: { padding: '2rem', minWidth: '25%' }
                }}
            >
                <DialogTitle textAlign='center'>{t('addStop')}</DialogTitle>
                <DialogContent>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <TextField
                            fullWidth
                            label='Random Name'
                            inputProps={
                                { readOnly: true }
                            }
                            value={randomName ?? ''}
                        /> 
                        <Box paddingLeft='1rem' paddingTop='1rem'>
                            <Button variant='contained' sx={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => updateRandomName()}>
                                <Tooltip title='Generate a new random name'>
                                    <ShuffleOnIcon />
                                </Tooltip>
                            </Button>
                        </Box>
                    </Box>
                    <TextField fullWidth label='Address' {...register('address')} />
                    <Box sx={{ height: 0, overflow: 'hidden' }}>
                        <TextField
                            value={orgId}
                            fullWidth {...register('orgId')}
                        />
                        <TextField
                            value={newStopId}
                            fullWidth {...register('id')}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'settings'})}</Button>
                    <Button disabled={disableButtons} variant='contained' type="submit">{t('createStop')}</Button>
                </DialogActions>
            </Dialog>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('stops')}
                    </Typography>
                </Box> 
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={startAddingStop}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addStop')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <Box flex='1'>
                <DataGrid rows={stops} columns={generateGridColumns()} rowHeight={100} processRowUpdate={processRowUpdate}/>
            </Box>
        </Box>
    )
}

export default Stops