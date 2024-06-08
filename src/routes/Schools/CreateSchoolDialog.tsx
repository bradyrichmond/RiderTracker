import { Transition } from '@/components/Transition'
import { SchoolType } from '@/types/SchoolType'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { schoolSchema } from '@/validation/schoolSchema'

interface CreateSchoolDialogProps {
    cancelAction(): void
    createSchool(school: Partial<SchoolType>): Promise<void>
    open: boolean
}

const CreateSchoolDialog = ({ createSchool, cancelAction, open }: CreateSchoolDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['schools', 'common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm({ resolver: yupResolver(schoolSchema) })

    const handleCreate = async (newRoute: Partial<SchoolType>) => {
        setDisableButtons(false)
        await createSchool(newRoute)
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
                <TextField
                    label='Address'
                    autoComplete='off'
                    fullWidth {...register('address')}
                    error={!!errors.address && touchedFields.address}
                    helperText={errors.address?.message ? t('fieldRequired', { ns: 'common' }) : ''}
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