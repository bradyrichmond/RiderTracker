import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { useFieldArray, useForm, Controller, FormProvider } from "react-hook-form"
import { GuardianType } from "../types/GuardianType"
import { RiderType } from "../types/RiderType"
import { FormDataType } from '../types/FormTypes'
import { pickRenderElement } from '../helpers/FormRenderHelpers'

interface LinkEntitiesModalProps<T> {
    cancelAction: () => void
    entity: T
    entityFactory: (args: string[]) => T
    formDefaultValues: FormDataType
    submitAction: (newEntity: T) => Promise<void>
    title: string
    submitButtonText: string
    open: boolean
}

const LinkEntitiesModal = <T extends 
        GuardianType | RiderType>({ 
        cancelAction, entity, entityFactory, formDefaultValues, submitAction, title, submitButtonText, open
    }: LinkEntitiesModalProps<T>) => {
    const [disableButtons, setDisabledButtons] = useState(false)
    const formMethods = useForm<FormDataType>({
        defaultValues: formDefaultValues
    })

    const {
        control,
        handleSubmit,
        watch
    } = formMethods

    const { fields } = useFieldArray({
        control,
        name: "inputs"
    })

    const values = watch("inputs")

    const handleCreateEntity = () => {
        setDisabledButtons(true)
        const newId = values[0].name
        const oldLinkIds = entity.guardianRiderLinks
        const newLinkIds = [...oldLinkIds, newId]
        const filteredLinkIds = newLinkIds.filter((l) => l !== "")
        const newEntity = entityFactory([entity.id, entity.organizationId, entity.firstName, entity.lastName])
        newEntity.guardianRiderLinks = filteredLinkIds
        submitAction(newEntity)   
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
            <DialogTitle textAlign='center'>{title}</DialogTitle>
            <DialogContent>
                <FormProvider {...formMethods} >
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
                    })}
                </FormProvider>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>Cancel</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{submitButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LinkEntitiesModal
