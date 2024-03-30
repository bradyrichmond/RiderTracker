import { createContext } from "react";

const defaultRoleContext = {
    heaviestRole: 'RiderTracker_Guardian',
    setHeaviestRole: (_role:string) => {},
    userFullName: '',
    setUserFullName: (_pictureUrl: string) => {},
    userPictureUrl: '',
    setUserPictureUrl: (_pictureUrl: string) => {}
}

export const RoleContext = createContext(defaultRoleContext)