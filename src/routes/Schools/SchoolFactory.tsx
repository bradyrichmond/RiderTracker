import { SchoolType } from "@/types/SchoolType";

export const schoolFactory = (args: string[] = []): SchoolType => {
    return {
        id: args[0],
        organizationId: args[1],
        schoolName: args[2],
        address: args[3]
    }
}