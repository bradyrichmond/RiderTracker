import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserType } from '@/types/AmplifyTypes'
import { useUserStore } from '@/store/UserStore'

const Guardian = () => {
    const [guardian, setGuardian] = useState<UserType>()
    const { id } = useParams()
    const getUserById = useUserStore().getUserById

    useEffect(() => {
        const getGuardianData = async () => {
            if (id) {
                try {
                    const guardianData = await getUserById(id)
                    setGuardian(guardianData)
                } catch {
                    console.error('Error setting guardian')
                }
            }
        }

        getGuardianData()
    }, [id, getUserById])

    return (
        <Box height='100%'>
            <Typography>Guardian Name: {guardian?.firstName} {guardian?.lastName}</Typography>
            <Typography>Organization: {guardian?.orgId}</Typography>
        </Box>
    )
}

export default Guardian