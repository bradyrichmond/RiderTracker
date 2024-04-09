import { LocationType } from "@/types/LocationType";

export function locationFactory(args: (number)[] = []): LocationType {
    return {
        lat: args[0],
        lon: args[1]
    };
}
