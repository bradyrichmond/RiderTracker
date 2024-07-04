import { Transition } from '@/components/Transition'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Schema } from '../../../amplify/data/resource'

interface CreateSchoolDialogProps {
    cancelAction(): void
    createSchool(school: Schema['School']['createType']): Promise<void>
    open: boolean
}

const CreateSchoolDialog = ({ createSchool, cancelAction, open }: CreateSchoolDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['schools', 'common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<Schema['School']['createType']>()

    const handleCreate = async (school: Schema['School']['createType']) => {
        setDisableButtons(false)
        await createSchool(school)
        setDisableButtons(false)
        reset()
    }

    return (
        <Dialog
            open={open}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleCreate),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addSchool')}</DialogTitle>
            <DialogContent>
                <TextField
                    label='School Name'
                    autoComplete='off'
                    fullWidth {...register('schoolName')}
                    error={!!errors.schoolName && touchedFields.schoolName}
                    helperText={errors.schoolName?.message ? t('fieldRequired', { ns: 'common' }) : ''}
                />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createSchool')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateSchoolDialog