import { Transition } from '@/components/Transition'
import { OptionsType } from '@/types/OptionsType'
import { riderSchema } from '@/validation/riderSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import { Schema } from '../../../amplify/data/resource'

interface CreateRiderDialogProps {
    allGuardians: OptionsType[]
    allStops: OptionsType[]
    cancelAction(): void
    createRider(data: Partial<Schema['Rider']['type']>): Promise<void>
    guardianId?: string
    isAddingRider: boolean
}

const CreateRiderDialog = ({ allGuardians, allStops, cancelAction, createRider, guardianId, isAddingRider }: CreateRiderDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders','common'])
    const { handleSubmit, register, reset, resetField, setValue, formState: { errors, touchedFields } } = useForm({ resolver: yupResolver(riderSchema) })

    const handleCreateRider = async (newRider: Partial<Schema['Rider']['createType']>) => {
        setDisableButtons(true)
        newRider.id = uuid()
        await createRider(newRider)
        resetForm()
        setDisableButtons(false)
    }

    const resetForm = () => {
        reset()
        resetField('schoolId')
        resetField('guardianIds')
        resetField('stopIds')
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
                {!guardianId ?
                    <FormControl fullWidth>
                        <Autocomplete
                            multiple
                            id='GuardianAutoComplete'
                            options={allGuardians}
                            getOptionLabel={(option: OptionsType) => option.label}
                            filterSelectedOptions
                            onChange={(_e, values: OptionsType[]) => setValue('guardianIds', values.map((v: OptionsType) => v.id))}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Guardian'
                                    id='GuardianLabel'
                                    error={!!errors.guardianIds?.message}
                                    helperText={errors.guardianIds?.message ? t(errors.guardianIds.message) : ''}
                                />
                            )}
                        />
                    </FormControl>
                    :
                    null
                }
                <FormControl fullWidth>
                    <Autocomplete
                        multiple
                        id='StopAutoComplete'
                        options={allStops}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, values: OptionsType[]) => setValue('stopIds', values.map((v: OptionsType) => v.id))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Stop'
                                id='StopLabel'
                                error={!!errors.stopIds?.message}
                                helperText={errors.stopIds?.message ? t(errors.stopIds.message) : ''}
                            />
                        )}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createRider')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRiderDialog
