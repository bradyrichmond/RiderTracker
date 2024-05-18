import { ROLE_WEIGHTS } from '../constants/RoleWeights'

// this is a misnomer, the role with the most permissions has the smallest weight
export const getHeaviestRole = (roles: string[]) => {
    const filtered = roles.filter((r) => ROLE_WEIGHTS[r])
    let heaviest = Number.MAX_SAFE_INTEGER
    let heaviestRoleName = ''

    filtered.forEach((r) => {
        if (ROLE_WEIGHTS[r] < heaviest) {
            heaviest = ROLE_WEIGHTS[r]
            heaviestRoleName = r
        }
    })

    return heaviestRoleName
}