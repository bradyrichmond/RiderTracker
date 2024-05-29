import { useSchoolStore } from '@/store/SchoolStore'
import { SchoolType } from '@/types/SchoolType'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const School = () => {
    const [school, setSchool] = useState<SchoolType>()
    const { id } = useParams()
    const { getSchoolById } = useSchoolStore()

    useEffect(() => {
        const getSchoolData = async () => {
            if (id) {
                const school = await getSchoolById(id)
                setSchool(school)
            }
        }

        getSchoolData()
    }, [id, getSchoolById])

    return (
        <Box height='100%'>
            <Typography>School Name: {school?.schoolName}</Typography>
        </Box>
    )
}

export default School