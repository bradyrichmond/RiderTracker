// import { createContext } from "react";

// const defaultRoleContext = {
//     heaviestRole: 'RiderTracker_Guardian',
//     setHeaviestRole: (_role:string) => {},
//     userFullName: '',
//     setUserFullName: (_pictureUrl: string) => {},
//     userPictureUrl: '',
//     setUserPictureUrl: (_pictureUrl: string) => {}
// }

// export const RoleContext = createContext(defaultRoleContext)

import { createContext } from "react";
 
export const RoleContext = createContext({
    heaviestRole: 'RiderTracker_Guardian',
    setHeaviestRole: (_role: RiderTrackerRole) => {},
    userFullName: '',
    setUserFullName: (_userFullName: string) => {},
    userPictureUrl: '',
    setUserPictureUrl: (_pictureUrl: string) => {}
});

import { PropsWithChildren, useState } from "react"
import { RiderTrackerRole } from "../constants/Roles";

export const RoleContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [heaviestRole, setHeaviestRole] = useState("RiderTracker_Guardian")
    const [userFullName, setUserFullName] = useState("")
    const [userPictureUrl, setUserPictureUrl] = useState("")

    return (
        <RoleContext.Provider value={{ heaviestRole, setHeaviestRole, userFullName, setUserFullName, userPictureUrl, setUserPictureUrl }}>
            {children}
        </RoleContext.Provider>
    );
};
