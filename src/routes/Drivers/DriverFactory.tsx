import { DriverType } from "../../types/DriverType";

export function driverFactory(args: string[]): DriverType {
    return {
        id: args[0],
        organizationId: args[1],
        firstName: args[2],
        lastName: args[3],
        email: args[4]
    };
}