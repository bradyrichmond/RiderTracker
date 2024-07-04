import { useSchoolStore } from '@/store/SchoolStore'
import { Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useMemo, useState } from 'react'
import EditSchoolDialog from './EditSchoolHoursDialog'
import { Schema } from '../../../amplify/data/resource'

interface SchoolProps {
    activeSchool?: string
}

type SchoolType = Schema['School']['type']

const School = ({ activeSchool }: SchoolProps) => {
    const [isEditingHours, setIsEditingHours] = useState(false)
    const getSchools = useSchoolStore().getSchools
    const schools = useSchoolStore().schools
    const updateSchoolHours = useSchoolStore().updateSchoolHours

    useEffect(() => {
        getSchools()
    }, [getSchools])

    const school = useMemo(() => {
        const selectedSchool = schools.find((s: SchoolType) => s.id === activeSchool)

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
            await getSchools()
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