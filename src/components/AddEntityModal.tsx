import { Box, Button, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFieldArray, useForm, Controller, FormProvider } from "react-hook-form"
import { BusType } from '../types/BusType'
import { DriverType } from "../types/DriverType"
import { GuardianType } from "../types/GuardianType"
import { OrganizationType } from "../types/OrganizationType"
import { RiderType } from "../types/RiderType"
import { ScanType } from "../types/ScanType"
import { AddEntityModalProps, FormInputType, OptionsType, FormDataType } from '../types/FormTypes'
import { pickRenderElement } from '../helpers/FormRenderHelpers'
import { ApiContext } from '../contexts/ApiContext'

const AddEntityModal = <T extends 
        BusType  | DriverType | GuardianType | OrganizationType | RiderType | ScanType>({ 
        cancelAction, entityFactory, formDefaultValues, organizationId, submitAction, titleSingular 
    }: AddEntityModalProps<T>) => {
    const [disableButtons, setDisabledButtons] = useState(false)
    const [availableOrgIds, setAvailableOrgIds] = useState<OptionsType[]>([])
    const formMethods = useForm<FormDataType>({
        defaultValues: formDefaultValues
    })
    const { api } = useContext(ApiContext)

    const {
        control,
        handleSubmit,
        watch
    } = formMethods

    const { fields } = useFieldArray({
        control,
        name: "inputs"
    })

    useEffect(() => {
        getAvailableOrgIds()
    }, [])

    const values = watch("inputs")

    const getAvailableOrgIds = async () => {
        const response = await api.execute(api.organizations.getOrganizations, [])
        const mappedOrgIds = response.map((o: OrganizationType) => {
            return { label: o.id, id: o.id }
        })
        setAvailableOrgIds(mappedOrgIds)
    }

    const handleCreateEntity = () => {
        setDisabledButtons(true)
        const entityId = uuidv4()
        const updatedValues = organizationId ? replaceOrgIdInValues(values) : values
        const args = updatedValues.map((v) => v.name)
        args.unshift(entityId)
        const newEntity = entityFactory(args)
        submitAction(newEntity)   
    }

    const replaceOrgIdInValues = (rawValues: FormInputType[]): FormInputType[] => {
        rawValues.shift()
        const newOrgIdElement = { name: organizationId ?? '' }
        rawValues.unshift(newOrgIdElement)
        return rawValues
    }

    return (
        <Box sx={{background: '#ffffff'}} borderRadius='2rem' padding='2rem' minWidth='50%' minHeight='50%' display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='2rem'>
                <Typography variant='h2'>Add {titleSingular}</Typography>
            </Box>
            <FormProvider {...formMethods} >
                <form onSubmit={handleSubmit(handleCreateEntity)}>
                    {fields.map((field, index) => {
                        if (field.name === "Organization Id") {
                            if (organizationId) {
                                return (<Typography>Organization Id: {organizationId}</Typography>)
                            }

                            field.options = availableOrgIds
                        }

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
                    <Box display='flex' justifyContent='space-evenly' alignItems='center' padding='2rem' flex='1'>
                        <Button variant='contained' onClick={cancelAction} disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                            <Typography variant='h5'>Cancel</Typography>
                        </Button>
                        <Button type='submit' variant='contained' disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                            <Typography variant='h5'>Create {titleSingular}</Typography>
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    )
}

export default AddEntityModal
