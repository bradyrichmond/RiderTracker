import { SelectionSetSchool, useSchoolStore } from '@/store/SchoolStore'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useMemo, useState } from 'react'
import EditSchoolDialog from './EditSchoolHoursDialog'

interface SchoolProps {
    activeSchool?: string
}

const School = ({ activeSchool }: SchoolProps) => {
    const [isEditingHours, setIsEditingHours] = useState(false)
    const updateSchools = useSchoolStore().updateSchools
    const schools = useSchoolStore().schools
    const updateSchoolHours = useSchoolStore().updateSchoolHours

    useEffect(() => {
        updateSchools()
    }, [updateSchools])

    const school = useMemo(() => {
        const selectedSchool = schools.find((s: SelectionSetSchool) => s.id === activeSchool)

        if (selectedSchool) {
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

    return (
        <Grid container spacing={2}>
            <EditSchoolDialog open={isEditingHours} cancelAction={toggleEditingHours} updateAction={updateHours} />
            <Grid xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h2'>{school?.schoolName}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default School