import { AdminType } from "@/types/AdminType";

export function adminFactory(args: (string)[] = []): AdminType {
    return {
        id: args[0],
        organizationId: args[1],
        firstName: args[2],
        lastName: args[3],
        email: args[4],
        title: args[5]
    };
}
