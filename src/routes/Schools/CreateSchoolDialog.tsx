import { Transition } from '@/components/Transition'
import { useSchoolStore } from '@/store/SchoolStore'
import { CreateSchoolInput } from '@/types/AmplifyTypes'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface CreateSchoolDialogProps {
    cancelAction(): void
    open: boolean
}

const CreateSchoolDialog = ({ cancelAction, open }: CreateSchoolDialogProps) => {
    const createSchool = useSchoolStore().createSchool
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['schools', 'common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<CreateSchoolInput>()

    const handleCreate = async (data: CreateSchoolInput) => {
        const { school, address } = data

        setDisableButtons(false)
        await createSchool(school, address)
        setDisableButtons(false)
        reset()
        cancelAction()
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
                    fullWidth {...register('school.schoolName')}
                    error={!!errors.school?.schoolName && touchedFields.school?.schoolName}
                    helperText={errors.school?.schoolName?.message ? t('fieldRequired', { ns: 'common' }) : ''}
                />
                <TextField
                    fullWidth
                    label='Address'
                    {...register('address')}
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