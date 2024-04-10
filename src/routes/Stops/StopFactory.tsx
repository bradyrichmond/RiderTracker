import { StopType } from "@/types/StopType";

export function stopFactory(args: (string)[] = []): StopType {
    return {
        id: args[0],
        organizationId: args[1],
        stopName: args[2]
    };
}
