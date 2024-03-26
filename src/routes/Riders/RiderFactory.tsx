import { RiderType } from "../../types/RiderType";

export function riderFactory(args: (string)[], guardianRiderLinks: string[] = []): RiderType {
    return {
        id: args[0],
        organizationId: args[1],
        firstName: args[2],
        lastName: args[3],
        guardianRiderLinks
    };
}