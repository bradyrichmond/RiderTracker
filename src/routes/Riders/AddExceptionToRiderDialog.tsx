import { Transition } from '@/components/Transition'
import { CreateExceptionInput, useExceptionStore } from '@/store/ExceptionStore'
import { useGuardianStore } from '@/store/GuardianStore'
import { OptionsType } from '@/types/FormTypes'
import { GuardianType } from '@/types/UserType'
import { exceptionSchema } from '@/validation/exceptionSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

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
    const { control, handleSubmit, reset, resetField, setValue, formState: { errors } } = useForm({ resolver: yupResolver(exceptionSchema) })
    const { id: riderId } = useParams()

    const allGuardians = useMemo(() => guardians.map((g: GuardianType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` })), [guardians])

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
        resetField('guardianId')
    }

    return (
        <Dialog
            open={isAddingException}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(createExceptionAction),
                sx: { padding: '2rem', minWidth: '25%' }
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
                <FormControl fullWidth>
                    <Autocomplete
                        id='GuardianAutoComplete'
                        options={allGuardians}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setValue('guardianId', value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Guardian'
                                id='GuardianLabel'
                                error={!!errors.guardianId?.message}
                                helperText={errors.guardianId?.message ? t(errors.guardianId.message, { ns: 'common' }) : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormGroup aria-label="position" row sx={{ display: 'flex', justifyContent: 'space-evenly', mt: '1rem' }}>
                    <FormControlLabel control={<Switch onChange={(_e, value: boolean) => setValue('pickup', value ?? false)} />} label={t('pickup')} labelPlacement='top' />
                    <FormControlLabel control={<Switch onChange={(_e, value: boolean) => setValue('dropoff', value ?? false)} />} label={t('dropoff')} labelPlacement='top' />
                </FormGroup>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createException')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddExceptionToRiderDialog
