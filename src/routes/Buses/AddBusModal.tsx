import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { getOrganizations } from '../../API'
import { RoleContext } from '../../contexts/RoleContext'
import { OrganizationType } from '../../types/OrganizationType'
import { BusType } from '../../types/BusType'
import {v4 as uuidv4} from 'uuid'

interface AddBusModalProps {
    organizationId?: string
    cancelAction: () => void
    submitAction: (_newBus: BusType) => void
}

const AddBusModal = ({ organizationId, cancelAction, submitAction }: AddBusModalProps) => {
    const [orgId, setOrgId] = useState('')
    const [busNumber, setBusNumber] = useState('')
    const [disableButtons, setDisabledButtons] = useState(false)
    const [availableOrgIds, setAvailableOrgIds] = useState<string[]>([])
    const roleContext = useContext(RoleContext)

    useEffect(() => {
        getAvailableOrgIds()
    }, [])

    const getAvailableOrgIds = async () => {
        const token = roleContext.token;
        const rawResponse = await getOrganizations(token)
        const response = await rawResponse.json()
        const mappedOrgIds = response.map((o: OrganizationType) => o.id)
        setAvailableOrgIds(mappedOrgIds)
    }

    const handleChange = (e:SelectChangeEvent) => {
        setOrgId(e.target.value)
    }

    const handleCreateBus = () => {
        setDisabledButtons(true)
        const newBusId = uuidv4()
        submitAction({ id: newBusId, organizationId: orgId, busNumber })
    }

    const handleBusNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBusNumber(e.target.value)
    }

    return (
        <Box sx={{background: '#ffffff'}} borderRadius='2rem' padding='2rem' minWidth='50%' minHeight='50%' display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='2rem'>
                <Typography variant='h2'>Add Bus</Typography>
            </Box>
            {!organizationId && availableOrgIds ?
                <FormControl fullWidth>
                    <InputLabel id="organizationIdLabel">Organization Id</InputLabel>
                    <Select
                        labelId="organizationIdLabel"
                        id="organizationIdSelectItem"
                        value={orgId}
                        label="Org Id"
                        onChange={handleChange}
                    >
                        {availableOrgIds.map((aoi) => <MenuItem key={aoi} value={aoi}>{aoi}</MenuItem>)}
                    </Select>
                </FormControl>
                :
                null
            }
            <Box marginTop='2rem'>
                <TextField label="Bus Number" variant="outlined" fullWidth value={busNumber} onChange={handleBusNumberChange}/>
            </Box>
            <Box display='flex' justifyContent='space-evenly' alignItems='center' padding='2rem' flex='1'>
                <Button variant='contained' onClick={cancelAction} disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                    <Typography variant='h5'>Cancel</Typography>
                </Button>
                <Button variant='contained' onClick={handleCreateBus} disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                    <Typography variant='h5'>Create Bus</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default AddBusModal