import { Transition } from '@/components/Transition'
import { CreateRiderTypeInput, RiderType } from '@/types/AmplifyTypes'
import { OptionsType } from '@/types/OptionsType'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

interface CreateRiderDialogProps {
    allGuardians: OptionsType[]
    cancelAction(): void
    createRider(data: Partial<RiderType>): Promise<void>
    guardianId?: string
    isAddingRider: boolean
}

const CreateRiderDialog = ({ cancelAction, createRider, isAddingRider }: CreateRiderDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders','common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<CreateRiderTypeInput>()

    const handleCreateRider = async (newRider: CreateRiderTypeInput) => {
        setDisableButtons(true)
        newRider.id = uuid()
        await createRider(newRider)
        resetForm()
        setDisableButtons(false)
    }

    const resetForm = () => {
        reset()
    }

    return (
        <Dialog
            open={isAddingRider}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleCreateRider),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addRider')}</DialogTitle>
            <DialogContent>
                <TextField
                    label='First Name'
                    autoComplete='off'
                    fullWidth {...register('firstName')}
                    error={!!errors.firstName?.message && touchedFields.firstName}
                    helperText={errors.firstName?.message ? t(errors.firstName.message) : ''}
                />
                <TextField
                    label='Last Name'
                    autoComplete='off'
                    fullWidth {...register('lastName')}
                    error={!!errors.lastName?.message && touchedFields.lastName}
                    helperText={errors.lastName?.message ? t(errors.lastName.message) : ''}
                />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createRider')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRiderDialog
