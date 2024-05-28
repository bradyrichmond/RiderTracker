import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { Transition } from '@/components/Transition'
import { CreateCognitoUserParams } from '@/API/AdminApis'

interface CreateDriverDialogProps {
    cancel(): void
    createDriver(input: CreateCognitoUserParams ): Promise<void>
    isAddingDriver: boolean
}

const CreateDriverDialog = ({ cancel, createDriver, isAddingDriver }: CreateDriverDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['drivers', 'common'])
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const {
        handleSubmit,
        register,
        reset
    } = useForm<CreateCognitoUserParams>()

    const createDriverAction = async (data: CreateCognitoUserParams) => {
        try {
            setDisableButtons(true)
            await createDriver(data)
            setDisableButtons(false)
            reset()
        } catch (e) {
            // TODO: Need better error handling
            console.error(e as string)
            setDisableButtons(false)
            showErrorSnackbar('Error creating Driver.')
        }
    }

    return (
        <Dialog
            open={isAddingDriver}
            onClose={cancel}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(createDriverAction),
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addDriver')}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label='First Name' {...register('given_name')} />
                <TextField fullWidth label='Last Name' {...register('family_name')} />
                <TextField fullWidth label='Email' {...register('email')} />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancel}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createDriver')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDriverDialog