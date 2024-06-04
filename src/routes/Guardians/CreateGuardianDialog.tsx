import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Transition } from '@/components/Transition'
import { useTranslation } from 'react-i18next'
import { CreateGuardianInput } from '.'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { guardianSchema } from '@/validation/guardianSchema'

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
        reset,
        formState: {
            errors,
            touchedFields
        }
    } = useForm<CreateGuardianInput>({ resolver: yupResolver(guardianSchema) })

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
                <TextField
                    fullWidth
                    label='First Name'
                    {...register('given_name')}
                    error={!!errors.given_name?.message && touchedFields.given_name}
                    helperText={errors.given_name?.message ? t(errors.given_name.message, { ns: 'common' }) : ''}
                />
                <TextField
                    fullWidth
                    label='Last Name'
                    {...register('family_name')}
                    error={!!errors.family_name?.message && touchedFields.family_name}
                    helperText={errors.family_name?.message ? t(errors.family_name.message, { ns: 'common' }) : ''}
                />
                <TextField
                    fullWidth
                    label='Email'
                    {...register('email')}
                    error={!!errors.email?.message && touchedFields.email}
                    helperText={errors.email?.message ? t(errors.email.message, { ns: 'common' }) : ''}
                />
                <TextField
                    fullWidth
                    label='Address'
                    {...register('address')}
                    error={!!errors.address?.message && touchedFields.address}
                    helperText={errors.address?.message ? t(errors.address.message, { ns: 'common' }) : ''}
                />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancel}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createGuardian')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateGuardianDialog