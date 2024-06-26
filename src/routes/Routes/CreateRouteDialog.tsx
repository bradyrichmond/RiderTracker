import { Transition } from '@/components/Transition'
import { useOrgStore } from '@/store/OrgStore'
import { RouteType } from '@/types/RouteType'
import { routeSchema } from '@/validation/routeSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

interface CreateRouteDialogProps {
    cancelAction(): void
    createRoute(route: Partial<RouteType>): Promise<void>
    isAddingRoute: boolean
}

const CreateRouteDialog = ({ createRoute, cancelAction, isAddingRoute }: CreateRouteDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const [newRouteId, setNewRouteId] = useState('')
    const { t } = useTranslation(['routes', 'common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm({ resolver: yupResolver(routeSchema) })
    const { orgId } = useOrgStore()

    useEffect(() => {
        const nextRouteId = uuid()
        setNewRouteId(nextRouteId)
    }, [])

    const handleCreate = async (newRoute: Partial<RouteType>) => {
        setDisableButtons(false)
        await createRoute(newRoute)
        setDisableButtons(false)
        reset()
        const nextRouteId = uuid()
        setNewRouteId(nextRouteId)
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
                <Box sx={{ height: 0, overflow: 'hidden' }}>
                    <TextField
                        value={orgId}
                        fullWidth {...register('orgId')}
                    />
                    <TextField
                        value={newRouteId}
                        fullWidth {...register('id')}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createRoute')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRouteDialog