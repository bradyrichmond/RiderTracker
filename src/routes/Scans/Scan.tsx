import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { ScanType } from '@/types/ScanType'
import { useParams } from 'react-router-dom'
import { ApiContext } from "@/contexts/ApiContextProvider"

const Scan = () => {
    const roleContext = useContext(RoleContext)
    const [scan, setScan] = useState<ScanType>()
    const { id } = useParams()
    const { api } = useContext(ApiContext)

    useEffect(() => {
        getScanData()
    }, [roleContext, id])

    const getScanData = async () => {
        if (id) {
            const scanData = await api.execute(api.scans.getScanById, [id])
            setScan(scanData)
        }
    }

    return (
        <Box height='100%'>
            <Typography>Scan Id: {scan?.id}</Typography>
            <Typography>Organization: {scan?.organizationId}</Typography>
        </Box>
    )
}

export default Scan