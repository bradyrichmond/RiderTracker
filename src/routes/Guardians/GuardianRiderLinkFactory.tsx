import { GuardianRiderLinkType } from "../../types/GuardianRiderLinkType";


export function guardianRiderLinkFactory(args: string[]): GuardianRiderLinkType {
    return {
        id: args[0],
        organizationId: args[1],
        sk: args[2],
        pk: args[3]
    };
}