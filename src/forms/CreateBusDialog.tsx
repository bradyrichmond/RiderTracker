import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Transition } from '@/components/Transition'
import { useBusStore } from '@/store/BusStore'

interface CreateBusDialogProps {
    cancel(): void
    existingBusNumbers: string[]
    isAddingBus: boolean
}

const CreateBusDialog = ({ cancel, existingBusNumbers, isAddingBus }: CreateBusDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const createBus = useBusStore().createBus
    const { t } = useTranslation(['buses', 'common'])
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const {
        handleSubmit,
        register,
        reset,
        formState: {
            errors,
            touchedFields
        }
    } = useForm<{ busNumber: string }>()

    const createBusAction = async (data: { busNumber: string }) => {
        const { busNumber } = data

        if (!busNumber) {
            showErrorSnackbar(t('missingBusNumber'))
            return
        }

        if (existingBusNumbers?.includes(busNumber)) {
            showErrorSnackbar(t('existingBusNumber'))
            return
        }

        setDisableButtons(true)

        const response = await createBus(busNumber)

        setDisableButtons(false)
        reset()
        cancel()

        return response
    }

    return (
        <Dialog
            open={isAddingBus}
            onClose={cancel}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(createBusAction),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addBus')}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label='Bus Number'
                    {...register('busNumber')}
                    error={!!errors.busNumber && touchedFields.busNumber}
                    helperText={errors.busNumber?.message ? t(errors.busNumber.message, { ns: 'common' }) : ''}
                />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancel}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createBus')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateBusDialog