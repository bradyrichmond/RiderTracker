import { Transition } from '@/components/Transition'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import { useRandomNameGenerator } from '@/hooks/useRandomNameGenerator'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { CreateStopTypeInput } from '@/types/AmplifyTypes'

interface CreateStopForRouteDialogProps {
    cancelAction(): void
    createStop(stop: CreateStopTypeInput): Promise<void>
    isAddingStop: boolean
}

const CreateStopForRouteDialog = ({ cancelAction, createStop, isAddingStop }: CreateStopForRouteDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['routes', 'common'])
    const { randomName, generateRandomName } = useRandomNameGenerator()
    const { handleSubmit, reset } = useForm<CreateStopTypeInput>()

    const handleCreateStop = async (stop: CreateStopTypeInput) => {
        setDisableButtons(true)
        stop.name = randomName
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
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createStop')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateStopForRouteDialog