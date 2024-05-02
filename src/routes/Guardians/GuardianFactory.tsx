import { GuardianType } from "@/types/UserType";

export function guardianFactory(args: string[]): GuardianType {
    return {
        id: args[0],
        orgId: args[1],
        firstName: args[2],
        lastName: args[3],
        email: args[4],
        riderIds: [""]
    };
}