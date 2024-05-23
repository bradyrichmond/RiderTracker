import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ScanType } from '@/types/ScanType'
import { useParams } from 'react-router-dom'
import { ApiContext } from '@/contexts/ApiContextProvider'
import { useOrgStore } from '@/store/OrgStore'

const Scan = () => {
    const { orgId } = useOrgStore()
    const [scan, setScan] = useState<ScanType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        getScanData()
    }, [id])

    const getScanData = async () => {
        if (id) {
            const scanData = await api.scans.getScanById(orgId, id)
            setScan(scanData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Scan Id: {scan?.id}</Typography>
            <Typography>Organization: {scan?.orgId}</Typography>
        </Box>
    )
}

export default Scan