import { createContext } from "react";
import { PropsWithChildren, useState } from "react"
import RiderTrackerAPI from "../API/API";
 
export const ApiContext = createContext({
    api: new RiderTrackerAPI(''),
    setApi: (_role: RiderTrackerAPI) => {}
});

export const ApiContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [api, setApi] = useState<RiderTrackerAPI>(new RiderTrackerAPI(''))

    return (
        <ApiContext.Provider value={{ api, setApi }}>
            {children}
        </ApiContext.Provider>
    );
};
