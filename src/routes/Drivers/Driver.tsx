import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApiStore } from '@/store/ApiStore'
import { UserType } from '@/types/UserType'
import { useOrgStore } from '@/store/OrgStore'

const Driver = () => {
    const [driver, setDriver] = useState<UserType>()
    const { id } = useParams()
    const { api } = useApiStore()
    const { orgId } = useOrgStore()

    useEffect(() => {
        getDriverData()
    }, [id])

    const getDriverData = async () => {
        if (id) {
            const driverData = await api?.users.getUserById(orgId, id)
            setDriver(driverData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Driver Name: {driver?.firstName} {driver?.lastName}</Typography>
            <Typography>Organization: {driver?.orgId}</Typography>
        </Box>
    )
}

export default Driver