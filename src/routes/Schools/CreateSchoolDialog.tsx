import { Transition } from '@/components/AddEntityModal'
import { useOrgStore } from '@/store/OrgStore'
import { SchoolType } from '@/types/SchoolType'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface CreateSchoolDialogProps {
    cancelAction(): void
    createSchool(school: SchoolType): Promise<void>
    open: boolean
}

const CreateSchoolDialog = ({ createSchool, cancelAction, open }: CreateSchoolDialogProps) => {
    const [disableButtons, setDisableButtons] = useState<boolean>(false)
    const { t } = useTranslation(['schools', 'common'])
    const { handleSubmit, register, reset } = useForm<SchoolType>()
    const { orgId } = useOrgStore()

    const handleCreate = async (newRoute: SchoolType) => {
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
                sx: { padding: '2rem', minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addSchool')}</DialogTitle>
            <DialogContent>
                <TextField
                    label='School Name'
                    autoComplete='off'
                    fullWidth {...register('schoolName')}
                />
                <TextField
                    label='Address'
                    autoComplete='off'
                    fullWidth {...register('address')}
                />
                <Box sx={{ height: 0, overflow: 'hidden' }}>
                    <TextField
                        value={orgId}
                        fullWidth {...register('orgId')}
                    />
                    <TextField
                        value='temp'
                        fullWidth {...register('id')}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createSchool')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateSchoolDialog