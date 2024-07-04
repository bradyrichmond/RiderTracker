import { Transition } from '@/components/Transition'
import { CreateRouteTypeInput } from '@/types/AmplifyTypes'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'


interface CreateRouteDialogProps {
    cancelAction(): void
    createRoute(route: CreateRouteTypeInput): Promise<void>
    isAddingRoute: boolean
}

const CreateRouteDialog = ({ createRoute, cancelAction, isAddingRoute }: CreateRouteDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['routes', 'common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<CreateRouteTypeInput>()

    const handleCreate = async (newRoute: CreateRouteTypeInput) => {
        setDisableButtons(false)
        await createRoute(newRoute)
        setDisableButtons(false)
        reset()
    }

    return (
        <Dialog
            open={isAddingRoute}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleCreate),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addRoute')}</DialogTitle>
            <DialogContent>
                <TextField
                    label='Route Number'
                    autoComplete='off'
                    fullWidth {...register('routeNumber')}
                    error={!!errors.routeNumber?.message && touchedFields.routeNumber}
                    helperText={errors.routeNumber?.message ? t(errors.routeNumber.message, { ns: 'common' }) : ''}
                />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createRoute')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRouteDialog