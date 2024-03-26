import { GuardianType } from "../../types/GuardianType";

export function guardianFactory(args: string[]): GuardianType {
    return {
        id: args[0],
        organizationId: args[1],
        firstName: args[2],
        lastName: args[3],
        guardianRiderLinks: [""]
    };
}