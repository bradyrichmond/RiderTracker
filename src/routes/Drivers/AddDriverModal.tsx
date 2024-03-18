import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { getOrganizations } from '../../API'
import { RoleContext } from '../../contexts/RoleContext'
import { OrganizationType } from '../../types/OrganizationType'
import {v4 as uuidv4} from 'uuid'
import { DriverType } from '../../types/DriverType'
import { useForm, SubmitHandler } from "react-hook-form"

interface AddDriverModalProps {
    organizationId?: string
    cancelAction: () => void
    submitAction: (_newDriver: DriverType) => void
}

interface AddDriverInputs {
    firstName: string
    lastName: string
}

const AddDriverModal = ({ organizationId, cancelAction, submitAction }: AddDriverModalProps) => {
    const [orgId, setOrgId] = useState('')
    const [disableButtons, setDisabledButtons] = useState(false)
    const [availableOrgIds, setAvailableOrgIds] = useState<string[]>([])
    const roleContext = useContext(RoleContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<AddDriverInputs>()

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

    const handleCreateDriver: SubmitHandler<AddDriverInputs> = (data) => {
        const { firstName, lastName } = data;
        setDisabledButtons(true)
        const newDriverId = uuidv4()
        submitAction({id: newDriverId, firstName, lastName, organizationId: orgId})
    }

    return (
        <Box sx={{background: '#ffffff'}} borderRadius='2rem' padding='2rem' minWidth='50%' minHeight='50%' display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='2rem'>
                <Typography variant='h2'>Add Driver</Typography>
            </Box>
            <form onSubmit={handleSubmit(handleCreateDriver)}>
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
                    <TextField label="First Name" variant="outlined" fullWidth {...register('firstName', {required: true, minLength: 2})}/>
                </Box>
                <Box marginTop='2rem'>
                    <TextField label="Last Name" variant="outlined" fullWidth {...register('lastName', {required: true, minLength: 2})}/>
                </Box>
                <Box display='flex' justifyContent='space-evenly' alignItems='center' padding='2rem' flex='1'>
                    <Button variant='contained' onClick={cancelAction} disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                        <Typography variant='h5'>Cancel</Typography>
                    </Button>
                    <Button type='submit' variant='contained' disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                        <Typography variant='h5'>Create Driver</Typography>
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default AddDriverModal
