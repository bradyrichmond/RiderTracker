import { UserType } from "@/types/UserType";

export function userFactory(args: (string)[] = []): UserType {
    return {
        id: args[0],
        orgId: args[1],
        firstName: args[2],
        lastName: args[3],
        email: args[4],
        title: args[5]
    };
}
