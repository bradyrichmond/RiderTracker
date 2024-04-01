type ResourceType = "buses" | "drivers" | "guardians" | "organizations" | "riders" | "scans"

interface RiderTrackerPermission {
    action: RiderTrackerAction;
    name?: string; // Optional descriptive name for the action
    resourceType: ResourceType; // Optional resource type (e.g., "bus", "driver")
    requiresConfirmation?: boolean; // Optional flag for confirmation requirement
}

const riderTrackerRole = ["RiderTracker_Wizard", "RiderTracker_OrgAdmin", "RiderTracker_Driver", "RiderTracker_Guardian"]
export type RiderTrackerRole = (typeof riderTrackerRole)[number]

export const isRiderTrackerRole = (x: any): x is RiderTrackerRole => {
    return riderTrackerRole.includes(x)
}
  
export type RiderTrackerAction =
    | "CREATE_BUS"
    | "UPDATE_BUS"
    | "DELETE_BUS"
    | "CREATE_DRIVER"
    | "UPDATE_DRIVER"
    | "DELETE_DRIVER"
    | "CREATE_GUARDIAN"
    | "UPDATE_GUARDIAN"
    | "DELETE_GUARDIAN"
    | "LINK_GUARDIAN_TO_RIDER"
    | "UNLINK_GUARDIAN_FROM_RIDER"
    | "CREATE_ORGANIZATION"
    | "UPDATE_ORGANIZATION"
    | "DELETE_ORGANIZATION"
    | "CREATE_RIDER"
    | "UPDATE_RIDER"
    | "DELETE_RIDER"
    | "LINK_RIDER_TO_GUARDIAN"
    | "UNLINK_RIDER_FROM_GUARDIAN"
  
export type RiderTrackerPermissions = RiderTrackerPermission[];
  
export const permissions: Record<RiderTrackerAction, RiderTrackerPermission> = {
    CREATE_BUS: { action: "CREATE_BUS", name: "Create Bus", resourceType: "buses" },
    UPDATE_BUS: { action: "UPDATE_BUS", name: "Update Bus", resourceType: "buses" },
    DELETE_BUS: { action: "DELETE_BUS", name: "Delete Bus", resourceType: "buses", requiresConfirmation: true },
    CREATE_DRIVER: { action: "CREATE_DRIVER", name: "Create Driver", resourceType: "drivers" },
    UPDATE_DRIVER: { action: "UPDATE_DRIVER", name: "Update Driver", resourceType: "drivers" },
    DELETE_DRIVER: { action: "DELETE_DRIVER", name: "Delete Driver", resourceType: "drivers", requiresConfirmation: true },
    CREATE_GUARDIAN: { action: "CREATE_GUARDIAN", name: "Create Guardian", resourceType: "guardians" },
    UPDATE_GUARDIAN: { action: "UPDATE_GUARDIAN", name: "Update Guardian", resourceType: "guardians" },
    DELETE_GUARDIAN: { action: "DELETE_GUARDIAN", name: "Delete Guardian", resourceType: "guardians", requiresConfirmation: true },
    LINK_GUARDIAN_TO_RIDER: { action: "LINK_GUARDIAN_TO_RIDER", name: "Link Guardian to Rider", resourceType: "guardians" },
    UNLINK_GUARDIAN_FROM_RIDER: { action: "UNLINK_GUARDIAN_FROM_RIDER", name: "Unink Guardian from Rider", resourceType: "guardians" },
    CREATE_ORGANIZATION: { action: "CREATE_ORGANIZATION", name: "Create Organization", resourceType: "organizations" },
    UPDATE_ORGANIZATION: { action: "UPDATE_ORGANIZATION", name: "Update Organization", resourceType: "organizations" },
    DELETE_ORGANIZATION: { action: "DELETE_ORGANIZATION", name: "Delete Organization", resourceType: "organizations", requiresConfirmation: true },
    CREATE_RIDER: { action: "CREATE_RIDER", name: "Create Rider", resourceType: "riders" },
    UPDATE_RIDER: { action: "UPDATE_RIDER", name: "Update Rider", resourceType: "riders" },
    DELETE_RIDER: { action: "DELETE_RIDER", name: "Delete Rider", resourceType: "riders", requiresConfirmation: true },
    LINK_RIDER_TO_GUARDIAN: { action: "LINK_RIDER_TO_GUARDIAN", name: "Link Rider to Guardian", resourceType: "riders" },
    UNLINK_RIDER_FROM_GUARDIAN: { action: "UNLINK_RIDER_FROM_GUARDIAN", name: "Unlink Rider from Guardian", resourceType: "riders" },
};
  
export const RIDERTRACKER_PERMISSIONS_BY_ROLE: Record<RiderTrackerRole, RiderTrackerPermissions> = {
    "RiderTracker_Wizard": Object.values(permissions), // Grant all permissions
    "RiderTracker_OrgAdmin": [
        permissions.CREATE_BUS,
        permissions.UPDATE_BUS,
        permissions.DELETE_BUS,
        permissions.CREATE_DRIVER,
        permissions.UPDATE_DRIVER,
        permissions.DELETE_DRIVER,
        permissions.CREATE_GUARDIAN,
        permissions.UPDATE_GUARDIAN,
        permissions.DELETE_GUARDIAN,
        permissions.LINK_GUARDIAN_TO_RIDER,
        permissions.UNLINK_GUARDIAN_FROM_RIDER,
        permissions.UPDATE_ORGANIZATION,
        permissions.DELETE_ORGANIZATION,
        permissions.CREATE_RIDER,
        permissions.UPDATE_RIDER,
        permissions.DELETE_RIDER,
        permissions.LINK_RIDER_TO_GUARDIAN,
        permissions.UNLINK_RIDER_FROM_GUARDIAN
    ],
    "RiderTracker_Driver": [
        permissions.UPDATE_BUS,
        permissions.DELETE_BUS,
        permissions.UPDATE_DRIVER,
        permissions.CREATE_RIDER,
        permissions.UPDATE_RIDER
    ],
    "RiderTracker_Guardian": [
        permissions.UPDATE_RIDER,
        permissions.DELETE_RIDER
    ]
};  
