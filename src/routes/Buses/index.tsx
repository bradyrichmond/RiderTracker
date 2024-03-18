import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { BusType } from "../../types/BusType";

const Buses = () => {
    const buses = useLoaderData() as BusType[]

    return (
        <Box>
            Buses
            <Box>
                {buses && buses.map((bus) => {
                    return (<Box key={bus.id}>{bus.id}</Box>)
                })}
            </Box>
        </Box>
    )
}

export default Buses;