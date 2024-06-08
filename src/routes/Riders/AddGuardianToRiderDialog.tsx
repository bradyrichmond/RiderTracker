import { Transition } from '@/components/Transition'
import { useGuardianStore } from '@/store/GuardianStore'
import { useRiderStore } from '@/store/RiderStore'
import { OptionsType } from '@/types/FormTypes'
import { GuardianType } from '@/types/UserType'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

interface AddGuardianToRiderDialogProps {
    cancelAction(): void
    isAddingGuardian: boolean
}

const AddGuardianToRiderDialog = ({ cancelAction, isAddingGuardian }: AddGuardianToRiderDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders', 'common'])
    const guardians = useGuardianStore().guardians
    const addGuardiansToRider = useRiderStore().addGuardiansToRider
    const { handleSubmit, reset, resetField, setValue, formState: { errors } } = useForm<{ guardianIds: string[] }>()
    const { id: riderId } = useParams()

    const allGuardians = useMemo((): OptionsType[] => guardians.map((g: GuardianType) => ({ id: g.id, label: `${g.firstName} ${g.lastName}` })), [guardians])

    const updateRiderGuardians = async ({ guardianIds }: { guardianIds: string[] }) => {
        setDisableButtons(true)
        if (riderId) {
            addGuardiansToRider(guardianIds, riderId)
            resetForm()
            setDisableButtons(false)
        }
    }

    const resetForm = () => {
        reset()
        resetField('guardianIds')
    }

    return (
        <Dialog
            open={isAddingGuardian}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(updateRiderGuardians),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addGuardianToRider')}</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('updateRider')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddGuardianToRiderDialog
