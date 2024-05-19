import { useNavigate } from 'react-router-dom'
import { RiderType } from '@/types/RiderType'
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField, Tooltip, Typography } from '@mui/material'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import InfoIcon from '@mui/icons-material/Info'
import { useContext, useEffect, useState } from 'react'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { RIDERTRACKER_PERMISSIONS_BY_ROLE, permissions } from '@/constants/Roles'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { RoleContext } from '@/contexts/RoleContext'
import { OptionsType } from '@/types/FormTypes'
import { Transition } from '@/components/AddEntityModal'
import { useForm } from 'react-hook-form'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'react-i18next'
import { GuardianType } from '@/types/UserType'
import { v4 as uuid } from 'uuid'
import { OrgDataContext } from '@/contexts/OrgDataContext'

const Riders = () => {
    const [riders, setRiders] = useState<RiderType[]>([])
    const [allSchools, setAllSchools] = useState<OptionsType[]>([])
    const [allGuardians, setAllGuardians] = useState<OptionsType[]>([])
    const [allStops, setAllStops] = useState<OptionsType[]>([])
    const [isAddingRider, setIsAddingRider] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const [newUserId, setNewUserId] = useState('')
    const navigate = useNavigate()
    const { api } = useContext(ApiContext)
    const { heaviestRole } = useContext(RoleContext)
    const { orgId } = useContext(OrgDataContext)
    const { t } = useTranslation(['riders','common'])
    const { handleSubmit, register, reset } = useForm<RiderType>()

    useEffect(() => {
        getRiders()
        getAllSchools()
        getAllStops()
        getAllGuardians()
    }, [orgId])

    const getRiders = async () => {
        // TODO: add pagination handling
        const fetchedRiders = await api.riders.getRiders(orgId)
        setRiders(fetchedRiders)
    }

    const getAllSchools = async () => {
        const fetchedSchools = await api.schools.getSchools(orgId)
        const mappedSchools = fetchedSchools.map((s) => ({
            label: s.schoolName,
            id: s.id
        }))
        setAllSchools(mappedSchools)
    }

    const getAllStops = async () => {
        const fetchedStops = await api.stops.getStops(orgId)
        const mappedStops = fetchedStops.map((s) => ({
            label: s.stopName,
            id: s.id
        }))

        setAllStops(mappedStops)
    }

    const getAllGuardians = async () => {
        const org = await api.organizations.getOrganizationById(orgId)
        const orgGuardianIds = org.guardianIds
        if (orgGuardianIds) {
            const fetchedGuardians: GuardianType[] = await api.users.getBulkGuardiansByIds(orgId, orgGuardianIds)
            const mappedGuardians = fetchedGuardians.map((g: GuardianType) => ({
                label: `${g.firstName} ${g.lastName}`,
                id: g.id
            }))
            setAllGuardians(mappedGuardians)
        }
    }

    const viewRiderDetails = (riderId: string) => {
        navigate(`/riders/${riderId}`)
    }

    const deleteRiderAction = async (riderId: string) => {
        await api.riders.deleteRider(orgId, riderId)
    }

    const createRider = async (newRider: RiderType) => {
        setDisableButtons(true)
        await api.riders.createRider(orgId, newRider)
        reset()
        setDisableButtons(false)
    }

    const getSchoolNameById = (schoolId: string) => {
        return allSchools.find((s) => s.id === schoolId)
    }

    const generateGridColumns = (): GridColDef[] => {
        const initialGridColumns: GridColDef[] = [
            { field: 'firstName',  headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'lastName',  headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'school',  headerName: 'School', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (value) => getSchoolNameById(value) },
            { field: 'stops',  headerName: 'Stop(s)', flex: 1, align: 'center', headerAlign: 'center', valueFormatter: (value: string[]) => value.length },
            { field: 'viewDetails', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
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
            } }
        ]

        if (RIDERTRACKER_PERMISSIONS_BY_ROLE[heaviestRole].includes(permissions.DELETE_RIDER)) {
            initialGridColumns.push({
                field: 'delete', headerName: '', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => deleteRiderAction(params.row.id)}
                        >
                            <Tooltip title='Delete Rider?'>
                                <PersonRemoveIcon />
                            </Tooltip>
                        </Button>
                    )
                }
            })
        }

        return initialGridColumns
    }

    const processRowUpdate = async (updatedRow: RiderType) => {
        return updatedRow
    }

    const startAddingRider = () => {
        const newUuid = uuid()
        setNewUserId(newUuid)
        setIsAddingRider(true)
    }

    const cancelAction = () => {
        setIsAddingRider(false)
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Dialog
                open={isAddingRider}
                onClose={cancelAction}
                TransitionComponent={Transition}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(createRider),
                    sx: { padding: '2rem', minWidth: '25%' }
                }}
            >
                <DialogTitle textAlign='center'>{t('addRider')}</DialogTitle>
                <DialogContent>
                    <TextField
                        label='First Name'
                        autoComplete='off'
                        fullWidth {...register('firstName')}
                    />
                    <TextField
                        label='Last Name'
                        autoComplete='off'
                        fullWidth {...register('lastName')}
                    />
                    <FormControl fullWidth>
                        <Autocomplete
                            id='SchoolAutoComplete'
                            options={allSchools}
                            getOptionLabel={(option: OptionsType) => option.label}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='School'
                                    id='SchoolLabel'
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Autocomplete
                            multiple
                            id='GuardianAutoComplete'
                            options={allGuardians}
                            getOptionLabel={(option: OptionsType) => option.label}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Guardian'
                                    id='GuardianLabel'
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Autocomplete
                            multiple
                            id='StopAutoComplete'
                            options={allStops}
                            getOptionLabel={(option: OptionsType) => option.label}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Stop'
                                    id='StopLabel'
                                />
                            )}
                        />
                    </FormControl>
                    <Box sx={{ height: 0, overflow: 'hidden' }}>
                        <TextField
                            value={orgId}
                            fullWidth {...register('orgId')}
                        />
                        <TextField
                            value={newUserId}
                            fullWidth {...register('id')}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'settings' })}</Button>
                    <Button disabled={disableButtons} variant='contained' type="submit">{t('createRider')}</Button>
                </DialogActions>
            </Dialog>
            <Box marginBottom='2rem' display='flex' flexDirection='row'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h2'>
                        {t('riders')}
                    </Typography>
                </Box>
                <Box padding='2rem' flex='1' display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='contained' onClick={startAddingRider}>
                        <Box display='flex' flexDirection='row'>
                            <AddCircleIcon />
                            <Box flex='1' marginLeft='1rem'>
                                <Typography>{t('addRider')}</Typography>
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Box>
            <Box flex='1'>
                <DataGrid rows={riders} columns={generateGridColumns()} rowHeight={100} processRowUpdate={processRowUpdate} />
            </Box>
        </Box>
    )
}

export default Riders