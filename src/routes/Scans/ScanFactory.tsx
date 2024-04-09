import { ScanType } from "@/types/ScanType";

export function scanFactory(args: (string)[] = []): ScanType {
    return {
        id: args[0],
        organizationId: args[1],
        driverId: args[2],
        riderIds: args[3].split(','),
        stopId: args[4],
        createdAt: Date.now()
    };
}
