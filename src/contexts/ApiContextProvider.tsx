import { createContext } from "react";
import { PropsWithChildren, useState } from "react"
import RiderTrackerAPI from "../API";
 
export const ApiContext = createContext({
    api: new RiderTrackerAPI(''),
    setApi: (_api: RiderTrackerAPI) => {}
});

export const ApiContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [api, setApi] = useState<RiderTrackerAPI>(new RiderTrackerAPI('TEST'))

    return (
        <ApiContext.Provider value={{ api, setApi }}>
            {children}
        </ApiContext.Provider>
    );
};
