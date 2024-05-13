import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { BusType } from '@/types/BusType'
import { useParams } from 'react-router-dom'
import { ApiContext } from "@/contexts/ApiContextProvider"
import { Trans, useTranslation } from 'react-i18next'

const Bus = () => {
    const roleContext = useContext(RoleContext)
    const [bus, setBus] = useState<BusType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)
    const { organizationId } = useContext(RoleContext)
    const { t } = useTranslation()

    useEffect(() => {
        getBusData()
    }, [roleContext, id])

    const getBusData = async () => {
        if (id) {
            const busData = await api.buses.getBusById(organizationId, id)
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