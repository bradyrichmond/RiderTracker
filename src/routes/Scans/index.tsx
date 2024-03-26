import { Box } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import { ScanType } from "../../types/ScanType"


const Scans = () => {
    const scans = useLoaderData() as ScanType[]

    return (
        <Box>
            Scans
            <Box>
                {scans && scans.map((scan) => {
                    return (<Box key={scan.id}>{scan.id}</Box>)
                })}
            </Box>
        </Box>
    )
}

export default Scans