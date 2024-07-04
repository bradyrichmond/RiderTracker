import { Transition } from '@/components/Transition'
import { CreateExceptionInput, useExceptionStore } from '@/store/ExceptionStore'
import { useGuardianStore } from '@/store/GuardianStore'
import { OptionsType } from '@/types/FormTypes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { DatePicker } from '@mui/x-date-pickers'
import { SyntheticEvent, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ExceptionTypeToggleButton from './ExceptionTypeToggleButton'
import { Schema } from '../../../amplify/data/resource'

interface AddExceptionToRiderDialogProps {
    cancelAction(): void
    isAddingException: boolean
}

const AddExceptionToRiderDialog = ({ cancelAction, isAddingException }: AddExceptionToRiderDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const createException = useExceptionStore().createException
    const guardians = useGuardianStore().guardians
    const getExceptions = useExceptionStore().getExceptions
    const { t } = useTranslation(['riders', 'common'])
    const { id: riderId } = useParams()
    const { control, handleSubmit, reset, resetField, setValue, formState: { errors }, watch } = useForm<CreateExceptionInput>()

    const allGuardians = useMemo(() => guardians.map((g: Schema['User']['type']) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` })), [guardians])

    const { pickup, dropoff } = watch()

    const createExceptionAction = async (data: CreateExceptionInput) => {
        if (!riderId) {
            throw 'How are you on this page without a rider id?'
        }

        setDisableButtons(true)
        await createException(data, riderId)
        resetForm()
        setDisableButtons(false)
        cancelAction()
        await getExceptions()
    }

    const resetForm = () => {
        reset()
        resetField('pickupGuardianId')
        resetField('dropoffGuardianId')
    }

    return (
        <Dialog
            open={isAddingException}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(createExceptionAction),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('createRouteException')}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Controller
                        name='date'
                        control={control}
                        render={() => {
                            return (
                                <DatePicker
                                    label="Exception Date"
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setValue('date', newValue.toDate())
                                        }
                                    }}
                                />
                            )
                        }}
                    />
                </FormControl>
                <Grid container spacing={2}>
                    <ExceptionTypeToggleButton title={t('pickup')} value={pickup ?? 'no change'} onChange={(_e: SyntheticEvent, value: Schema['OverrideType']['type']) => { setValue('pickup', value) }} />
                    <ExceptionTypeToggleButton title={t('dropoff')} value={dropoff ?? 'no change'} onChange={(_e: SyntheticEvent, value: Schema['OverrideType']['type']) => { setValue('dropoff', value) }} />
                </Grid>
                <FormControl fullWidth>
                    <Autocomplete
                        id='PickupGuardianAutoComplete'
                        options={allGuardians}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setValue('pickupGuardianId', value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Pick-Up Guardian'
                                id='PickupGuardianLabel'
                                error={!!errors.pickupGuardianId?.message}
                                helperText={errors.pickupGuardianId?.message ? t(errors.pickupGuardianId.message, { ns: 'common' }) : ''}
                            />
                        )}
                        disabled={pickup !== 'override'}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Autocomplete
                        id='DropoffGuardianAutoComplete'
                        options={allGuardians}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setValue('dropoffGuardianId', value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Drop-Off Guardian'
                                id='DropoffGuardianLabel'
                                error={!!errors.dropoffGuardianId?.message}
                                helperText={errors.dropoffGuardianId?.message ? t(errors.dropoffGuardianId.message, { ns: 'common' }) : ''}
                            />
                        )}
                        disabled={dropoff !== 'override'}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createException')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddExceptionToRiderDialog
