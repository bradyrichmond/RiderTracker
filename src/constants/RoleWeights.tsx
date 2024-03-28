import { RoleWithWeightType } from "../types/RoleWithWeightType";
import { RIDERTRACKER_ROLES } from "./Roles";

// Drivers should never be OrgAdmins, right?

export const ROLE_WEIGHTS:RoleWithWeightType[] = [
    {
        name: RIDERTRACKER_ROLES.WIZARD,
        weight: 1
    },
    {
        name: RIDERTRACKER_ROLES.ORG_ADMIN,
        weight: 5
    },
    {
        name: RIDERTRACKER_ROLES.DRIVER,
        weight: 5
    },
    {
        name: RIDERTRACKER_ROLES.GUARDIAN,
        weight: 10
    }
]