import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transition } from '@/components/AddEntityModal'
import { useTranslation } from 'react-i18next'
import { CreateGuardianInput } from '.'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'

interface CreateGuardianDialogProps {
    cancel(): void
    createGuardian(input: CreateGuardianInput ): Promise<void>
    isAddingGuardian: boolean
}

const CreateGuardianDialog = ({ cancel, createGuardian, isAddingGuardian }: CreateGuardianDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['guardians', 'common'])
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const {
        handleSubmit,
        register,
        reset
    } = useForm<CreateGuardianInput>()

    const createGuardianAction = async (data: CreateGuardianInput) => {
        try {
            setDisableButtons(true)
            await createGuardian(data)
            setDisableButtons(false)
            reset()
        } catch (e) {
            // TODO: Need better error handling
            console.error(e as string)
            setDisableButtons(false)
            showErrorSnackbar('Error creating Guardian.')
        }
    }

    return (
        <Dialog
            open={isAddingGuardian}
            onClose={cancel}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(createGuardianAction),
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addGuardian')}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label='First Name' {...register('given_name')} />
                <TextField fullWidth label='Last Name' {...register('family_name')} />
                <TextField fullWidth label='Email' {...register('email')} />
                <TextField fullWidth label='Address' {...register('address')} />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancel}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createGuardian')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateGuardianDialog