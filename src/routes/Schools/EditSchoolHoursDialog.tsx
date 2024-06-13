import { Transition } from '@/components/Transition'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { editSchoolHoursSchema } from '@/validation/editSchoolHoursSchema'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom'
import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolHourType, SchoolType } from '@/types/SchoolType'

interface EditSchoolDialogProps {
    cancelAction(): void
    open: boolean
    updateAction(newHoursArray: SchoolHourType[]): Promise<void>
}

const EditSchoolDialog = ({ cancelAction, updateAction, open }: EditSchoolDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const [schoolHoursCopy, setSchoolHoursCopy] = useState<SchoolHourType[]>()
    const schools = useSchoolStore().schools
    const { handleSubmit } = useForm({ resolver: yupResolver(editSchoolHoursSchema) })
    const { id: schoolId } = useParams()
    const { t } = useTranslation('schools')

    useMemo(() => {
        const pickedSchool = schools.find((s: SchoolType) => s.id === schoolId)
        setSchoolHoursCopy(pickedSchool?.hours ?? [])
        return pickedSchool
    }, [schools, schoolId])

    const handleUpdate = async () => {
        if (schoolHoursCopy) {
            setDisableButtons(true)
            await updateAction(schoolHoursCopy)
            setDisableButtons(false)
            cancelAction()
        }
    }

    const handleChange = (index: number, time: Dayjs, startTime?: boolean) => {
        if (schoolHoursCopy) {
            const dayToEdit = schoolHoursCopy[index]
            const propertyToUpdate = startTime ? 'startTime' : 'endTime'

            if (dayToEdit) {
                dayToEdit[propertyToUpdate] = time.toDate().getTime().toString()
                setSchoolHoursCopy((current?: SchoolHourType[]) => {
                    if (current) {
                        current[index] = dayToEdit
                        return current
                    }
                })
            }
        }
    }

    return (
        <Dialog
            open={open}
            onClose={cancelAction}
            TransitionComponent={Transition}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(handleUpdate),
                sx: { padding: 4, minWidth: '50%' }
            }}
        >
            <DialogTitle textAlign='center'>
                <Typography variant='h4'>{t('editSchoolHours')}</Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {schoolHoursCopy?.map((d, i) => <TimeEntry key={d.dayName} index={i} label={t(d.dayName)} startTime={d.startTime} endTime={d.endTime} handleChange={handleChange} />)}
                </Grid>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('updateHours')}</Button>
            </DialogActions>
        </Dialog>
    )
}

interface TimeEntryProps {
    endTime: string
    handleChange(index: number, time: Dayjs | null, startTime?: boolean): void
    index: number
    label: string
    startTime: string
}

const TimeEntry = ({ endTime, handleChange, index, label, startTime }: TimeEntryProps) => {
    const { t } = useTranslation('schools')

    const dayjsStartTime = useMemo(() => {
        return dayjs(Number(startTime))
    }, [startTime])

    const dayjsEndTime = useMemo(() => {
        return dayjs(Number(endTime))
    }, [endTime])

    const startChange = (value: Dayjs | null) => {
        if (value) {
            handleChange(index, value, true)
        }
    }

    const endChange = (value:  Dayjs | null) => {
        if (value) {
            handleChange(index, value)
        }
    }

    return (
        <Grid xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>{label}</Typography>
                <Grid container spacing={2} sx={{  }}>
                    <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TimePicker label={t('startTime')} value={dayjsStartTime} onChange={startChange} />
                    </Grid>
                    <Grid xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TimePicker label={t('endTime')} value={dayjsEndTime} onChange={endChange} />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default EditSchoolDialog