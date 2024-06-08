import { Transition } from '@/components/Transition'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { StopType } from '@/types/StopType'
import { useRandomNameGenerator } from '@/hooks/useRandomNameGenerator'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useOrgStore } from '@/store/OrgStore'

interface CreateStopForRouteDialogProps {
    cancelAction(): void
    createStop(stop: StopType): Promise<void>
    isAddingStop: boolean
}

const CreateStopForRouteDialog = ({ cancelAction, createStop, isAddingStop }: CreateStopForRouteDialogProps) => {
    const [newStopId, setNewStopId] = useState<string>('')
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['routes', 'common'])
    const { randomName, generateRandomName } = useRandomNameGenerator()
    const { handleSubmit, register, reset } = useForm<StopType>()
    const { orgId } = useOrgStore()

    useEffect(() => {
        if (orgId) {
            const nextStopId = uuid()
            setNewStopId(nextStopId)
        }
    }, [orgId])

    const handleCreateStop = async (stop: StopType) => {
        setDisableButtons(true)
        stop.stopName = randomName
        await createStop(stop)
        generateRandomName()
        setDisableButtons(false)
        reset()
        generateRandomName()
    }

    return (
        <Dialog
            open={isAddingStop}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleCreateStop),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addStop')}</DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <TextField
                        fullWidth
                        label='Random Name'
                        inputProps={
                            { readOnly: true }
                        }
                        value={randomName ?? ''}
                    />
                    <Box sx={{ pt: 2, pl: 2 }}>
                        <Button variant='contained' sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={generateRandomName}>
                            <Tooltip title='Generate a new random name'>
                                <ShuffleOnIcon />
                            </Tooltip>
                        </Button>
                    </Box>
                </Box>
                <TextField fullWidth label='Address' {...register('address')} />
                <Box sx={{ height: 0, overflow: 'hidden' }}>
                    <TextField
                        value={orgId}
                        fullWidth {...register('orgId')}
                    />
                    <TextField
                        value={newStopId}
                        fullWidth {...register('id')}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createStop')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateStopForRouteDialog