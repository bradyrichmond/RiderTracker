import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
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
import { ApiContext } from '../contexts/ApiContextProvider'

const AddEntityModal = <T extends 
        BusType  | DriverType | GuardianType | OrganizationType | RiderType | ScanType>({ 
        cancelAction, entityFactory, formDefaultValues, organizationId, submitAction, titleSingular, open 
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
        <Dialog
            open={open}
            onClose={cancelAction}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleCreateEntity),
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>Add {titleSingular}</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods} >
                    {fields.map((field, index) => {
                        if (field.name === "Organization Id") {
                            if (organizationId) {
                                return;
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
                    })}
                </FormProvider>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>Cancel</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">Create {titleSingular}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEntityModal
