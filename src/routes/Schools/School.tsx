import { ApiContext } from '@/contexts/ApiContextProvider'
import { useOrgStore } from '@/store/OrgStore'
import { SchoolType } from '@/types/SchoolType'
import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const School = () => {
    const [school, setSchool] = useState<SchoolType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { orgId } = useOrgStore()

    useEffect(() => {
        getSchoolData()
    }, [id])

    const getSchoolData = async () => {
        if (id) {
            const school = await api.schools.getSchoolById(orgId, id)
            setSchool(school)
        }
    }

    return (
        <Box height='100%'>
            <Typography>School Name: {school?.schoolName}</Typography>
        </Box>
    )
}

export default School