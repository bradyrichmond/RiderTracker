import { Box } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import { DriverType } from "../../types/DriverType"

const Drivers = () => {
    const drivers = useLoaderData() as DriverType[]

    return (
        <Box>
            Drivers
            <Box>
                {drivers && drivers.map((driver) => {
                    return (<Box key={driver.id}>{driver.id}</Box>)
                })}
            </Box>
        </Box>
    )
}

export default Drivers;