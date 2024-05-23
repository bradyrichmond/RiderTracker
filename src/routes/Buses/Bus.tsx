import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BusType } from '@/types/BusType'
import { useParams } from 'react-router-dom'
import { useApiStore } from '@/store/ApiStore'
import { Trans, useTranslation } from 'react-i18next'
import { useOrgStore } from '@/store/OrgStore'

const Bus = () => {
    const [bus, setBus] = useState<BusType>()
    const { id } = useParams()
    const { api } = useApiStore()
    const { orgId } = useOrgStore()
    const { t } = useTranslation()

    useEffect(() => {
        getBusData()
    }, [id])

    const getBusData = async () => {
        if (id) {
            const busData = await api?.buses.getBusById(orgId, id)
            setBus(busData)
        }
    }

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