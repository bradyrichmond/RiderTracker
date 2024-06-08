import { Transition } from '@/components/Transition'
import { useRiderStore } from '@/store/RiderStore'
import { useStopStore } from '@/store/StopStore'
import { OptionsType } from '@/types/FormTypes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

interface AddStopToRiderDialogProps {
    cancelAction(): void
    isAddingStop: boolean
}

const AddStopToRiderDialog = ({ cancelAction, isAddingStop }: AddStopToRiderDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders', 'common'])
    const stops = useStopStore().stops
    const addStopToRider = useRiderStore().addStopToRider
    const { handleSubmit, reset, resetField, setValue, formState: { errors } } = useForm<{ stopId: string }>()
    const { id: riderId } = useParams()

    const allStops = useMemo((): OptionsType[] => stops.map((stop) => ({ id: stop.id, label: stop.stopName })), [stops])

    const updateRiderStops = async ({ stopId }: { stopId: string }) => {
        setDisableButtons(true)
        if (riderId) {
            addStopToRider(stopId, riderId)
            resetForm()
            setDisableButtons(false)
        }
    }

    const resetForm = () => {
        reset()
        resetField('stopId')
    }

    return (
        <Dialog
            open={isAddingStop}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(updateRiderStops),
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addStopToRider')}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Autocomplete
                        id='StopAutoComplete'
                        options={allStops}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => {
                            if (value) {
                                setValue('stopId', value.id) }
                            }
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Stop'
                                id='StopLabel'
                                error={!!errors.stopId?.message}
                                helperText={errors.stopId?.message ? t(errors.stopId.message) : ''}
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

export default AddStopToRiderDialog
