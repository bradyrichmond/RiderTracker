import { ROLE_WEIGHTS } from "../constants/RoleWeights"
import { RoleWithWeightType } from "../types/RoleWithWeightType"

// this is a misnomer, the role with the most permissions has the smallest weight
export const getHeaviestRole = (roles: string[]) => {
    let availableRolesWithWeights:RoleWithWeightType[] = []

    ROLE_WEIGHTS.forEach((rw) => {
        if (roles.includes(rw.name)) {
            availableRolesWithWeights.push(rw)
        }
    })

    const sortedUserRoles = availableRolesWithWeights.sort(roleSort)
    return sortedUserRoles[0].name
}

const roleSort = (a:RoleWithWeightType, b: RoleWithWeightType) => {
    return a.weight < b.weight ? -1 : 1;
}