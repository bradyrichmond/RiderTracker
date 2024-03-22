import { OrganizationType } from "../../types/OrganizationType";

export function organizationFactory(args: string[]): OrganizationType {
    return {
        id: args[0]
    };
}