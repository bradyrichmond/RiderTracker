import { Transition } from '@/components/Transition'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Slider, Switch, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { dayData } from './School'
import { yupResolver } from '@hookform/resolvers/yup'
import { editSchoolHoursSchema } from '@/validation/editSchoolHoursSchema'

interface SchoolDataTimeType {
    formatted: string
    hour: number
    label: string
    minute: number
    am: boolean
}

interface SchoolDataType {
    dayName: string
    startTime: SchoolDataTimeType
    endTime: SchoolDataTimeType
}

interface EditSchoolDialogProps {
    cancelAction(): void
    open: boolean
    updateAction(data: any): Promise<void>
    schoolHours: SchoolDataType[]
}

const EditSchoolDialog = ({ cancelAction, updateAction, open }: EditSchoolDialogProps) => {
    const [disableButtons, setDisableButtons] = useState(false)
    const { handleSubmit } = useForm({ resolver: yupResolver(editSchoolHoursSchema) })
    const { t } = useTranslation('schools')

    const handleCreate = async (data: any) => {
        setDisableButtons(true)
        await updateAction(data)
        setDisableButtons(false)
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
                sx: { padding: 4, minWidth: '50%' }
            }}
        >
            <DialogTitle textAlign='center'>{t('editSchoolHours')}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {dayData.map((d) => <TimeEntry key={d.dayName} label={t(d.dayName)} startTime={d.startTime} endTime={d.endTime} />)}
                </Grid>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button disabled={disableButtons} variant='contained' onClick={cancelAction}>{t('cancel', { ns: 'common' })}</Button>
                <Button disabled={disableButtons} variant='contained' type="submit">{t('updateHours')}</Button>
            </DialogActions>
        </Dialog>
    )
}

interface TimeEntryItemProps {
    am?: boolean
    hour: number
    label: string
    minute: number
}

interface TimeEntryProps {
    label: string
    startTime: TimeEntryItemProps
    endTime: TimeEntryItemProps
}

const TimeEntry = ({ endTime, label, startTime }: TimeEntryProps) => {
    const { t } = useTranslation('schools')

    return (
        <Grid xs={12}>
                <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{label}</Typography>
                <TimeEntryItem label={t(startTime.label)} hour={startTime.hour} minute={startTime.minute} am={startTime.am} />
                <TimeEntryItem label={t(endTime.label)} hour={endTime.hour} minute={endTime.minute} am={endTime.am} />
            </Grid>
    )
}

const TimeEntryItem = ({ am, hour, label, minute }: TimeEntryItemProps) => {
    const { t } = useTranslation('schools')

    const displayTime = useMemo(() => {
        const formattedHour = hour.toString().padStart(2, '0')
        const formattedMinute = minute.toString().padStart(2, '0')
        const apresMidi = am ? 'AM' : 'PM'

        return `${formattedHour}:${formattedMinute} ${apresMidi}`
    }, [am, hour, minute])

    const handleChange = (_event: Event, value: any) => {
        alert(JSON.stringify(value))
    }

    return (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>{label}</Typography>
                </Grid>
                <Grid xs={12} md={5}>
                    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>{t('hour')}</Typography>
                    <Slider
                        min={1}
                        max={12}
                        step={1}
                        value={hour}
                        onChange={handleChange}
                        marks
                    />
                </Grid>
                <Grid xs={12} md={5} mdOffset={2}>
                    <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>{t('minute')}</Typography>
                    <Slider
                        min={0}
                        max={55}
                        step={5}
                        value={minute}
                        marks
                    />
                </Grid>
                <Grid xs={12}>
                    <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>{displayTime}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControlLabel control={<Switch checked={am} />} label={am ? 'AM' : 'PM'} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default EditSchoolDialog