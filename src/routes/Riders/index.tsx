import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { type RiderType } from '../../types/RiderType';

const Riders = () => {
    const riders = useLoaderData() as RiderType[]

    return (
        <Box>
            Riders
            <Box>
                {riders && riders.map((rider) => {
                    return (<Box key={rider.id}>{rider.firstName}</Box>)
                })}
            </Box>
        </Box>
    )
}

export default Riders;