import { RiderType } from "../../types/RiderType";

export function riderFactory(args: (string)[] = []): RiderType {
    return {
        id: args[0],
        orgId: args[1],
        firstName: args[2],
        lastName: args[3]
    };
}