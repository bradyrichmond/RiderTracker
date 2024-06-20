import { Transition } from '@/components/Transition'
import { useRouteStore } from '@/store/RouteStore'
import { OptionsType } from '@/types/FormTypes'
import { RouteType } from '@/types/RouteType'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface SelectRouteDialogProps {
    cancelAction(): void
    isSelectingRoute: boolean
    selectRouteAction(routeId: string): Promise<void>
}

const SelectRouteDialog = ({ cancelAction, isSelectingRoute, selectRouteAction }: SelectRouteDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const [routes, setRoutes] = useState<RouteType[]>([])
    const { t } = useTranslation(['riders', 'common'])
    const getInactiveRoutes = useRouteStore().getInactiveRoutes
    const { handleSubmit, reset, resetField, setValue, formState: { errors } } = useForm<{ routeId: string }>()

    useEffect(() => {
        const getRoutes = async () => {
            const fetchedRoutes = await getInactiveRoutes()
            setRoutes(fetchedRoutes)
        }

        getRoutes()
    }, [getInactiveRoutes, isSelectingRoute])

    const allRoutes = useMemo((): OptionsType[] => {
        if (routes?.length > 0) {
            return routes.map((r: RouteType) => ({ id: r.id, label: `${r.routeNumber}` }))
        }

        return []
    }, [routes])

    const handleSelectRoute = ({ routeId }: { routeId: string }) => {
        setDisableButtons(true)
        selectRouteAction(routeId)
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
                        options={allRoutes}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setValue('routeId', value?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Route'
                                id='RouteLabel'
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
