import { createContext } from "react";
 
export const ApiContext = createContext({
    api: new RiderTrackerAPI(''),
    setApi: (_role: RiderTrackerAPI) => {}
});

import { PropsWithChildren, useState } from "react"
import { RiderTrackerAPI } from "../API";

export const ApiContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [api, setApi] = useState(new RiderTrackerAPI(''))

    return (
        <ApiContext.Provider value={{ api, setApi }}>
            {children}
        </ApiContext.Provider>
    );
};
