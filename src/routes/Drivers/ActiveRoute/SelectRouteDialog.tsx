import { Transition } from '@/components/Transition'
import { useRouteStore } from '@/store/RouteStore'
import { OptionsType } from '@/types/FormTypes'
import { RouteType } from '@/types/RouteType'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface SelectRouteDialogProps {
    cancelAction(): void
    isSelectingRoute: boolean
    selectRouteAction(routeId: string): Promise<void>
}

const SelectRouteDialog = ({ cancelAction, isSelectingRoute, selectRouteAction }: SelectRouteDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders', 'common'])
    const routes = useRouteStore().routes
    const { handleSubmit, reset, resetField, setValue, formState: { errors } } = useForm<{ routeId: string }>()

    const allGuardians = useMemo((): OptionsType[] => routes.map((r: RouteType) => ({ id: r.id, label: `${r.routeNumber}` })), [routes])

    const handleSelectRoute = () => {
        setDisableButtons(true)
        selectRouteAction
        setDisableButtons(false)
        resetForm()
        cancelAction()
    }

    const resetForm = () => {
        reset()
        resetField('routeId')
    }

    return (
        <Dialog
            open={isSelectingRoute}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleSelectRoute),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('selectRoute')}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Autocomplete
                        id='RouteAutoComplete'
                        options={allGuardians}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setValue('routeId', value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Guardian'
                                id='GuardianLabel'
                                error={!!errors.routeId?.message}
                                helperText={errors.routeId?.message ? t(errors.routeId.message) : ''}
                            />
                        )}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('selectRoute')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SelectRouteDialog
