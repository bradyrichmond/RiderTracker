import { Transition } from '@/components/Transition'
import { useRiderStore } from '@/store/RiderStore'
import { useSchoolStore } from '@/store/SchoolStore'
import { useUserStore } from '@/store/UserStore'
import { CreateRiderTypeInput } from '@/types/AmplifyTypes'
import { OptionsType } from '@/types/OptionsType'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'

interface CreateRiderDialogProps {
    cancelAction(): void
    guardianId?: string
    isAddingRider: boolean
    schoolId?: string
}

const CreateRiderDialog = ({ cancelAction, guardianId, isAddingRider, schoolId }: CreateRiderDialogProps) => {
    const [guardianIds, setGuardianIds] = useState<string[]>([])
    const [selectedSchoolId, setSelectedSchoolId] = useState<string>()
    const updateUsers = useUserStore().updateUsers
    const updateSchools = useSchoolStore().updateSchools
    const baseSchools = useSchoolStore().schools
    const createRider = useRiderStore().createRider
    const users = useUserStore().users
    const [disableButtons, setDisableButtons] = useState(false)
    const { t } = useTranslation(['riders', 'common'])
    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm<CreateRiderTypeInput>()

    useEffect(() => {
        if (isAddingRider) {
            updateUsers()
            updateSchools()
        }
    }, [updateUsers, updateSchools, isAddingRider])

    const guardians = useMemo(() => {
        const items = users.filter((u) => u.isGuardian).map((u) => ({
            id: u.id,
            label: `${u.firstName} ${u.lastName}`
        }))
        return items
    }, [users])

    const schools = useMemo(() => {
        const items = baseSchools.map((s) => ({
            id: s.id,
            label: s.schoolName
        }))

        return items
    }, [baseSchools])

    const handleCreateRider = async (newRider: CreateRiderTypeInput) => {
        setDisableButtons(true)
        newRider.id = uuid()
        newRider.schoolId = schoolId || selectedSchoolId
        await createRider(newRider, guardianId ? [guardianId] : guardianIds)
        resetForm()
        cancelAction()
        setDisableButtons(false)
    }

    const resetForm = () => {
        reset()
    }

    return (
        <Dialog
            open={isAddingRider}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleCreateRider),
                sx: { padding: 4, minWidth: '25%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('addRider')}</DialogTitle>
            <DialogContent>
                <TextField
                    label='First Name'
                    autoComplete='off'
                    fullWidth {...register('firstName')}
                    error={!!errors.firstName?.message && touchedFields.firstName}
                    helperText={errors.firstName?.message ? t(errors.firstName.message) : ''}
                />
                <TextField
                    label='Last Name'
                    autoComplete='off'
                    fullWidth {...register('lastName')}
                    error={!!errors.lastName?.message && touchedFields.lastName}
                    helperText={errors.lastName?.message ? t(errors.lastName.message) : ''}
                />
                {!schoolId && schools.length ?
                    <Autocomplete
                        id='SchoolAutoComplete'
                        options={schools}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, value: OptionsType | null) => setSelectedSchoolId(value?.id)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='School'
                                id='SchoolLabel'
                            />
                        )}
                    />
                    :
                    null
                }
                {!guardianId && guardians.length ?
                    <Autocomplete
                        multiple
                        id='GuardianAutoComplete'
                        options={guardians}
                        getOptionLabel={(option: OptionsType) => option.label}
                        filterSelectedOptions
                        onChange={(_e, values: OptionsType[]) => setGuardianIds(values.map((v: OptionsType) => v.id))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Guardian'
                                id='GuardianLabel'
                            />
                        )}
                    />
                    :
                    null
                }
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('createRider')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateRiderDialog
