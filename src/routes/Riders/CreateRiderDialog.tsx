import { Transition } from '@/components/AddEntityModal'
import { OptionsType } from '@/types/FormTypes'
import { RiderType } from '@/types/RiderType'
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface CreateRiderDialogProps {
    allGuardians: OptionsType[]
    allSchools: OptionsType[]
    allStops: OptionsType[]
    cancelAction(): void
    createRider(data: RiderType): void
    disableButtons: boolean
    isAddingRider: boolean
    newRiderId: string
    orgId: string
    startAddingRider(): void
}

const CreateRiderDialog = ({ allGuardians, allSchools, allStops, cancelAction, createRider, disableButtons, isAddingRider, newRiderId, orgId }: CreateRiderDialogProps) => {
    const [schoolIdInput, setSchoolIdInput] = useState<string>('')
    const { t } = useTranslation(['riders','common'])
    const { handleSubmit, register, reset, resetField, setValue } = useForm<RiderType>()

    const handleCreateRider = (newRider: RiderType) => {
        newRider.id = newRiderId
        newRider.schoolId = schoolIdInput
        createRider(newRider)
        resetForm()
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
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addRider')}</DialogTitle>
            <DialogContent>
                <TextField
                    label='First Name'
                    autoComplete='off'
                    fullWidth {...register('firstName')}
                />
                <TextField
                    label='Last Name'
                    autoComplete='off'
                    fullWidth {...register('lastName')}
                />
                <FormControl fullWidth>
                    <Autocomplete
                        id='SchoolAutoComplete'
                        options={allSchools}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setSchoolIdInput(value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='School'
                                id='SchoolLabel'
                            />
                        )}
                    />
                </FormControl>
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
                            />
                        )}
                    />
                </FormControl>
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
                            />
                        )}
                    />
                </FormControl>
                <Box sx={{ height: 0, overflow: 'hidden' }}>
                    <TextField
                        value={orgId}
                        fullWidth {...register('orgId')}
                    />
                    <TextField
                        value={newRiderId}
                        fullWidth {...register('id')}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createRider')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRiderDialog
