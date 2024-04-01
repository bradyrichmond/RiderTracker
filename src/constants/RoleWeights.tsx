import { RoleWithWeightType } from "../types/RoleWithWeightType";

// Drivers should never be OrgAdmins, right?

export const ROLE_WEIGHTS:RoleWithWeightType[] = [
    {
        name: "RiderTracker_Wizard",
        weight: 1
    },
    {
        name: "RiderTracker_OrgAdmin",
        weight: 5
    },
    {
        name: "RiderTracker_Driver",
        weight: 5
    },
    {
        name: "RiderTracker_Guardian",
        weight: 10
    }
]