import { createContext } from "react";
import { RiderTrackerAPI } from "../API";

const defaultApiContext = {
    api: new RiderTrackerAPI(''),
    setApi: (_api: RiderTrackerAPI) => {}
}

export const ApiContext = createContext(defaultApiContext)