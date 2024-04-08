import { LocationType } from "@/types/ScanType";

export function scanFactory(args: (number)[] = []): LocationType {
    return {
        lat: args[0],
        lon: args[1]
    };
}
