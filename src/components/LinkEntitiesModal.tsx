import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useFieldArray, useForm, Controller, FormProvider } from "react-hook-form"
import { GuardianType } from "../types/GuardianType"
import { RiderType } from "../types/RiderType"
import { FormDataType } from '../types/FormTypes'
import { pickRenderElement } from '../helpers/FormRenderHelpers'

interface LinkEntitiesModalProps<T> {
    cancelAction: () => void
    entity: T
    entityFactory: (args: string[], newLinkIds: string[]) => T
    formDefaultValues: FormDataType
    submitAction: (newEntity: T) => Promise<void>
    title: string
    submitButtonText: string
}

const LinkEntitiesModal = <T extends 
        GuardianType | RiderType>({ 
        cancelAction, entity, entityFactory, formDefaultValues, submitAction, title, submitButtonText 
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
        const newEntity = entityFactory([entity.id, entity.organizationId, entity.firstName, entity.lastName], filteredLinkIds)
        submitAction(newEntity)   
    }

    return (
        <Box sx={{background: '#ffffff'}} borderRadius='2rem' padding='2rem' minWidth='50%' minHeight='50%' display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='2rem'>
                <Typography variant='h2'>{title}</Typography>
            </Box>
            <FormProvider {...formMethods} >
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
                    <Box display='flex' justifyContent='space-evenly' alignItems='center' padding='2rem' flex='1'>
                        <Button variant='contained' onClick={cancelAction} disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                            <Typography variant='h5'>Cancel</Typography>
                        </Button>
                        <Button type='submit' variant='contained' disabled={disableButtons} sx={{padding: '1rem', minWidth: '25%'}}>
                            <Typography variant='h5'>{submitButtonText}</Typography>
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    )
}

export default LinkEntitiesModal
