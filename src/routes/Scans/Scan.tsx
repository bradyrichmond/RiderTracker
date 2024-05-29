import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ScanType } from '@/types/ScanType'
import { useParams } from 'react-router-dom'
import { useScanStore } from '@/store/ScanStore'

const Scan = () => {
    const { getScanById } = useScanStore()
    const [scan, setScan] = useState<ScanType>()
    const { id } = useParams()

    useEffect(() => {
        const getScanData = async () => {
            if (id) {
                const scanData = await getScanById(id)
                setScan(scanData)
            }
        }

        getScanData()
    }, [id, getScanById])

    return (
        <Box height='100%'>
            <Typography>Scan Id: {scan?.id}</Typography>
            <Typography>Organization: {scan?.orgId}</Typography>
        </Box>
    )
}

export default Scan