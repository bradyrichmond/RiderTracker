import { BusType } from "@/types/BusType";

export function busFactory(args: string[]): BusType {
    return {
        id: args[0],
        orgId: args[1],
        busNumber: args[2]
    };
}