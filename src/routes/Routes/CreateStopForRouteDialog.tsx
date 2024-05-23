import { Transition } from '@/components/AddEntityModal'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { StopType } from '@/types/StopType'
import { useRandomNameGenerator } from '@/hooks/useRandomNameGenerator'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { OrgDataContext } from '@/contexts/OrgDataContext'
import { v4 as uuid } from 'uuid'

interface CreateStopForRouteDialogProps {
    cancelAction(): void
    createStop(stop: StopType): Promise<void>
    isAddingStop: boolean
}

const CreateStopForRouteDialog = ({ cancelAction, createStop, isAddingStop }: CreateStopForRouteDialogProps) => {
    const [newStopId, setNewStopId] = useState<string>('')
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation('routes')
    const { randomName, generateRandomName } = useRandomNameGenerator()
    const { handleSubmit, register, reset } = useForm<StopType>()
    const { orgId } = useContext(OrgDataContext)

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
                sx: { padding: '2rem', minWidth: '25%' }
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
                    <Box paddingLeft='1rem' paddingTop='1rem'>
                        <Button variant='contained' sx={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={generateRandomName}>
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
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'settings' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createStop')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateStopForRouteDialog