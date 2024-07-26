import { Transition } from '@/components/Transition'
import { useRiderStore } from '@/store/RiderStore'
import { RiderType } from '@/types/AmplifyTypes'
import { OptionsType } from '@/types/OptionsType'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { SyntheticEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AssignRiderToGuardianDialogProps {
    cancel(): void
    guardianId?: string
    isAssigningRider: boolean
}

const AssignRiderToGuardianDialog = ({ cancel, guardianId, isAssigningRider }: AssignRiderToGuardianDialogProps) => {
    const [riderId, setRiderId] = useState('')
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders', 'common'])
    const assignRider = useRiderStore().assignRiderToGuardian
    const riders = useRiderStore().riders
    const riderOptions: OptionsType[] = useMemo(() => {
        const mapped = riders.map((r: RiderType) => ({
            id: r.id,
            label: `${r.firstName} ${r.lastName}`
        }))

        return mapped
    }, [riders])

    const handleCreateRider = async () => {
        if (guardianId && riderId) {
            setDisableButtons(true)
            await assignRider(riderId, guardianId)
            setDisableButtons(false)
        }
    }

    return (
        <Dialog
            open={isAssigningRider}
            onClose={cancel}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleCreateRider,
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('assignRider')}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Autocomplete
                        id='orgId'
                        options={riderOptions}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e: SyntheticEvent, r: OptionsType | null) => setRiderId(r?.id ?? '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id={`${params.id}Label`}
                            />
                        )}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancel}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('assignRider')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AssignRiderToGuardianDialog
