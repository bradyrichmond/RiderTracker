import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GuardianType } from '@/types/UserType'
import { useGuardianStore } from '@/store/GuardianStore'

const Guardian = () => {
    const [guardian, setGuardian] = useState<GuardianType>()
    const { id } = useParams()
    const { getGuardianById } = useGuardianStore()

    useEffect(() => {
        const getGuardianData = async () => {
            if (id) {
                try {
                    const guardianData = await getGuardianById(id)
                    setGuardian(guardianData)
                } catch {
                    console.error('Error setting guardian')
                }
            }
        }

        getGuardianData()
    }, [id, getGuardianById])

    return (
        <Box height='100%'>
            <Typography>Guardian Name: {guardian?.firstName} {guardian?.lastName}</Typography>
            <Typography>Organization: {guardian?.orgId}</Typography>
        </Box>
    )
}

export default Guardian