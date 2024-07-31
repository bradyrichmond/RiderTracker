import { SelectionSetSchool, useSchoolStore } from '@/store/SchoolStore'
import { Box, Paper, TextField, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react'
import EditSchoolDialog from './EditSchoolHoursDialog'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@/contexts/SnackbarContextProvider'

interface SchoolProps {
    activeSchool?: string
}

const School = ({ activeSchool }: SchoolProps) => {
    const [isEditingHours, setIsEditingHours] = useState(false)
    const [editedSchoolName, setEditedSchoolName] = useState('')
    const [isEditingSchoolName, setIsEditingSchoolName] = useState(false)
    const [isUpdatingSchoolName, setIsUpdatingSchoolName] = useState(false)
    const updateSchools = useSchoolStore().updateSchools
    const updateSchool = useSchoolStore().updateSchool
    const schools = useSchoolStore().schools
    const updateSchoolHours = useSchoolStore().updateSchoolHours
    const { showErrorSnackbar } = useContext(SnackbarContext)
    const { t } = useTranslation('schools')

    useEffect(() => {
        updateSchools()
    }, [updateSchools])

    const school = useMemo(() => {
        const selectedSchool = schools.find((s: SelectionSetSchool) => s.id === activeSchool)

        if (selectedSchool) {
            setEditedSchoolName(selectedSchool.schoolName)
            return selectedSchool
        }
    }, [schools, activeSchool])

    const toggleEditingHours = () => {
        setIsEditingHours((cur) => !cur)
    }

    const updateHours = async (newTimeObject: []) => {
        if (activeSchool) {
            await updateSchoolHours(activeSchool, newTimeObject)
            await updateSchools()
        }
    }

    const toggleEditingSchoolName = () => {
        setIsEditingSchoolName((cur) => !cur)
    }

    const updateSchoolName = async () => {
        if (school) {
            if (editedSchoolName) {
                try {
                    setIsUpdatingSchoolName(true)
                    await updateSchool({ id: school.id, orgId: school.orgId, schoolName: editedSchoolName })
                    await updateSchools()
                    setIsEditingSchoolName(false)
                    setIsUpdatingSchoolName(false)
                } catch (e: unknown) {
                    console.error(e as string)
                }
            } else {
                showErrorSnackbar(t('cannotSetSchoolNameEmpty'))
            }
        }
    }

    const handleEditedSchoolNameChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedSchoolName(e.currentTarget.value)
    }

    return (
        <Grid container spacing={2}>
            <EditSchoolDialog open={isEditingHours} cancelAction={toggleEditingHours} updateAction={updateHours} />
            <Grid xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Box onClick={toggleEditingSchoolName}>
                        {isEditingSchoolName ?
                            <TextField label={t('schoolName')} onSubmit={updateSchoolName} onClick={(e: SyntheticEvent) => e.stopPropagation()} disabled={isUpdatingSchoolName} value={editedSchoolName} onBlur={updateSchoolName} onChange={handleEditedSchoolNameChange} fullWidth />
                            :
                            <Tooltip title={t('clickToEditSchoolName')}>
                                <Typography variant='h2'>{school?.schoolName}</Typography>
                            </Tooltip>
                        }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default School