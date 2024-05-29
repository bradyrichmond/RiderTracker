import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BusType } from '@/types/BusType'
import { useParams } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { useBusStore } from '@/store/BusStore'

const Bus = () => {
    const [bus, setBus] = useState<BusType>()
    const { id } = useParams()
    const { getBusById } = useBusStore()
    const { t } = useTranslation()

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
            <Trans t={t}>
                <Typography>Bus Number: {bus?.busNumber}</Typography>
            </Trans>
            <Trans t={t}>
                <Typography>Organization: {bus?.orgId}</Typography>
            </Trans>
        </Box>
    )
}

export default Bus