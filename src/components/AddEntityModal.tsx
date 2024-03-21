import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFieldArray, useForm, Controller } from "react-hook-form"
import { RoleContext } from '../contexts/RoleContext'
import { getOrganizations } from '../API'
import { BusType } from '../types/BusType'
import { DriverType } from "../types/DriverType"
import { GuardianType } from "../types/GuardianType"
import { OrganizationType } from "../types/OrganizationType"
import { RiderType } from "../types/RiderType"
import { ScanType } from "../types/ScanType"

export interface AddEntityModalProps<T> {
    organizationId?: string
    cancelAction: () => void
    entityFactory: (args: string[]) => T
    formDefaultValues: FormData
    submitAction: (newEntity: T) => Promise<void>
    titleSingular: string
}

export interface FormInput {
    name: string
    inputType?: string
    options?: string[]
}

export interface FormData {
    inputs: FormInput[]
}

const AddEntityModal = <T extends 
        BusType  | DriverType | GuardianType | OrganizationType | RiderType | ScanType>({ 
        cancelAction, entityFactory, formDefaultValues, organizationId, submitAction, titleSingular 
    }: AddEntityModalProps<T>) => {
    const [disableButtons, setDisabledButtons] = useState(false)
    const [availableOrgIds, setAvailableOrgIds] = useState<string[]>([])
    const [dropdownIndex, setDropdownIndex] = useState<number>()
    const roleContext = useContext(RoleContext)
    const {
        control,
        handleSubmit,
        register,
        watch
    } = useForm<FormData>({
        defaultValues: formDefaultValues
    })

    const { fields, remove } = useFieldArray({
        control,
        name: "inputs"
    })

    useEffect(() => {
        getAvailableOrgIds()
    }, [])

    useEffect(() => {
        if (organizationId) {
            remove(dropdownIndex)
        }
    }, [dropdownIndex])

    const values = watch("inputs")

    const getAvailableOrgIds = async () => {
        const token = roleContext.token;
        const rawResponse = await getOrganizations(token)
        const response = await rawResponse.json()
        const mappedOrgIds = response.map((o: OrganizationType) => o.id)
        setAvailableOrgIds(mappedOrgIds)
    }

    const handleCreateEntity = () => {
        setDisabledButtons(true)
        const entityId = uuidv4()
        const args = values.map((v) => v.name)
        args.unshift(entityId)
        const newEntity = entityFactory(args)
        submitAction(newEntity)   
    }

    const pickRenderElement = (field: FormInput, index: number) => {
        switch (field.inputType) {
            case "select":
                if (!field.options) {
                    setDropdownIndex(index)
                } 

                return (
                    <FormControl fullWidth>
                        <InputLabel id={`${field.name}Label`}>{field.name}</InputLabel>
                        <Select
                            labelId={`${field.name}Label`}
                            id={`${field.name}SelectItem`}
                            label={field.name}
                            {...register(`inputs.${index}.name`)}
                        >
                            {field.options ? 
                                field.options.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)
                                :
                                availableOrgIds.map((aoi) => <MenuItem key={aoi} value={aoi}>{aoi}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                )
            default:
                return <TextField label={field.name} fullWidth {...register(`inputs.${index}.name`)}/>
        }
    }

    return (
        <Box sx={{background: '#ffffff'}} borderRadius='2rem' padding='2rem' minWidth='50%' minHeight='50%' display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='2rem'>
                <Typography variant='h2'>Add {titleSingular}</Typography>
            </Box>
            <form onSubmit={handleSubmit(handleCreateEntity)}>
                {fields.map((field, index) => {
                    return (
                        <Box key={field.id} marginTop='2rem'>
                            <Controller
                                render={() => pickRenderElement(field, index) }
                                name={`inputs.${index}.name`}
                                control={control}
                            />
                        </Box>
                    )
                })
                }
                {JSON.stringify(values)}
                <Box display='flex' justifyContent='space-evenly' alignItems='center' padding='2rem' flex='1'>
                    <Button variant='contained' onClick={cancelAction} disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                        <Typography variant='h5'>Cancel</Typography>
                    </Button>
                    <Button type='submit' variant='contained' disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                        <Typography variant='h5'>Create {titleSingular}</Typography>
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default AddEntityModal
