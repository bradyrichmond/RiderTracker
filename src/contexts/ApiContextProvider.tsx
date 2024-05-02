import { createContext } from "react";
import { PropsWithChildren, useState } from "react"
import RiderTrackerAPI from "../API"

let uninstantiatedApi: RiderTrackerAPI
 
export const ApiContext = createContext({
    // @ts-ignore
    api: uninstantiatedApi,
    setApi: (_api: RiderTrackerAPI) => {}
});

export const ApiContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [api, setApi] = useState<RiderTrackerAPI>(uninstantiatedApi)

    return (
        <ApiContext.Provider value={{ api, setApi }}>
            {children}
        </ApiContext.Provider>
    );
};
