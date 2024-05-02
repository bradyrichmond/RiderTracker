import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { useFieldArray, useForm, Controller, FormProvider } from "react-hook-form"
import { StopType } from "@/types/StopType"
import { FormDataType } from '@/types/FormTypes'
import { pickRenderElement } from '@/helpers/FormRenderHelpers'
import { stopFactory } from './StopFactory'

interface AssignRidersToStopDialogProps {
    cancelAction: () => void
    entity: StopType
    formDefaultValues: FormDataType
    submitAction: (newEntity: StopType) => Promise<void>
    title: string
    submitButtonText: string
    stopName: string
    open: boolean
}

const AssignRidersToStopDialog = ({ 
        cancelAction, entity, formDefaultValues, submitAction, title, submitButtonText, stopName, open
    }: AssignRidersToStopDialogProps) => {
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
        const oldRiderIds = entity.riderIds ?? []
        const newRiderIds = [...oldRiderIds, newId]
        const filteredLinkIds = newRiderIds.filter((l) => l !== "")
        const newStop = stopFactory([entity.id, entity.orgId, stopName])
        newStop.riderIds = filteredLinkIds
        submitAction(newStop)
        setDisabledButtons(false)
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

export default AssignRidersToStopDialog
