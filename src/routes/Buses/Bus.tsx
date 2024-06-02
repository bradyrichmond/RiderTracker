import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BusType } from '@/types/BusType'
import { useParams } from 'react-router-dom'
import { useBusStore } from '@/store/BusStore'

const Bus = () => {
    const [bus, setBus] = useState<BusType>()
    const { id } = useParams()
    const { getBusById } = useBusStore()

    useEffect(() => {
        const getBusData = async () => {
            if (id) {
                const busData = await getBusById(id)
                setBus(busData)
            }
        }

        getBusData()
    }, [id, getBusById])

    return (
        <Box height='100%'>
                <Typography>Bus Number: {bus?.busNumber}</Typography>
                <Typography>Organization: {bus?.orgId}</Typography>
        </Box>
    )
}

export default Bus