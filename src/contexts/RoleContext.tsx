import { createContext } from "react";

const defaultRoleContext = {
    heaviestRole: 'RiderTracker_Guardian',
    setHeaviestRole: (_role:string) => {},
    token: '',
    setToken: (_token:string) => {}
}

export const RoleContext = createContext(defaultRoleContext)