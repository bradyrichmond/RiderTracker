import { StopType } from "@/types/StopType";

export function stopFactory(args: (string)[] = []): StopType {
    return {
        id: args[0],
        orgId: args[1],
        stopName: args[2],
        address: args[3]
    };
}
