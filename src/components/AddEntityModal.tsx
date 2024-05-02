import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material'
import { forwardRef, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFieldArray, useForm, Controller, FormProvider } from "react-hook-form"
import { BusType } from '../types/BusType'
import { OrganizationType } from "../types/OrganizationType"
import { RiderType } from "../types/RiderType"
import { ScanType } from "../types/ScanType"
import { AddEntityModalProps, FormDataType } from '../types/FormTypes'
import { pickRenderElement } from '../helpers/FormRenderHelpers'
import { SchoolType } from '@/types/SchoolType'
import { TransitionProps } from '@mui/material/transitions'
import { ErrorMessage } from "@hookform/error-message"
import { RoleContext } from '@/contexts/RoleContextProvider'
import { StopType } from '@/types/StopType'
import { UserType } from '@/types/UserType'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const AddEntityModal = <T extends 
        BusType | OrganizationType | RiderType | ScanType | SchoolType | StopType | UserType>({ 
        cancelAction, entityFactory, formDefaultValues, submitAction, titleSingular, open 
    }: AddEntityModalProps<T>) => {
    const [disableButtons, setDisabledButtons] = useState(false)
    const formMethods = useForm<FormDataType>({
        defaultValues: formDefaultValues
    })
    const { organizationId } = useContext(RoleContext)

    const {
        control,
        handleSubmit,
        watch,
        formState
    } = formMethods

    const { errors } = formState

    const { fields } = useFieldArray({
        control,
        name: "inputs"
    })

    const values = watch("inputs")

    const handleCreateEntity = async () => {
        setDisabledButtons(true)
        const entityId = uuidv4()
        const args = values.map((v) => v.name)
        args.unshift(organizationId)
        args.unshift(entityId)
        const newEntity = entityFactory(args)
        await submitAction(newEntity)
        setDisabledButtons(false)
    }

    return (    
        <Dialog
            open={open}
            onClose={cancelAction}
            TransitionComponent={Transition}
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
                    <ErrorMessage
                        errors={errors}
                        name="multipleErrorInput"
                        render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>{message}</p>
                        ))
                        }
                    />
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
