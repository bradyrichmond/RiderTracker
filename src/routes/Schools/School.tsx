import { ApiContext } from "@/contexts/ApiContextProvider"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { SchoolType } from "@/types/SchoolType"
import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const School = () => {
    const [school, setSchool] = useState<SchoolType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { organizationId } = useContext(RoleContext)

    useEffect(() => {
        getSchoolData()
    }, [id])

    const getSchoolData = async () => {
        if (id) {
            const school = await api.schools.getSchoolById(organizationId, id)
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