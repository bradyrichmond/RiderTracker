type ResourceType = 'buses' | 'drivers' | 'guardians' | 'organizations' | 'riders' | 'routes' | 'scans' | 'stops'

interface RiderTrackerPermission {
    action: RiderTrackerAction;
    name?: string; // Optional descriptive name for the action
    resourceType: ResourceType; // Optional resource type (e.g., "bus", "driver")
    requiresConfirmation?: boolean; // Optional flag for confirmation requirement
}

export enum RIDER_TRACKER_ROLES {
    RIDER_TRACKER_WIZARD = 'RiderTracker_Wizard',
    RIDER_TRACKER_ORGADMIN = 'RiderTracker_OrgAdmin',
    RIDER_TRACKER_DRIVER = 'RiderTracker_Driver',
    RIDER_TRACKER_GUARDIAN = 'RiderTracker_Guardian',
    RIDER_TRACKER_UNAUTHENTICATED = 'RiderTracker_Unauthenticated'
}

const riderTrackerRole = ['RiderTracker_Wizard', 'RiderTracker_OrgAdmin', 'RiderTracker_Driver', 'RiderTracker_Guardian']
export type RiderTrackerRole = (typeof riderTrackerRole)[number]

export const isRiderTrackerRole = (x: string): x is RiderTrackerRole => {
    return riderTrackerRole.includes(x)
}

export type RiderTrackerAction =
    | 'CREATE_BUS'
    | 'UPDATE_BUS'
    | 'DELETE_BUS'
    | 'CREATE_DRIVER'
    | 'UPDATE_DRIVER'
    | 'DELETE_DRIVER'
    | 'CREATE_GUARDIAN'
    | 'UPDATE_GUARDIAN'
    | 'DELETE_GUARDIAN'
    | 'LINK_GUARDIAN_TO_RIDER'
    | 'UNLINK_GUARDIAN_FROM_RIDER'
    | 'CREATE_ORGANIZATION'
    | 'UPDATE_ORGANIZATION'
    | 'DELETE_ORGANIZATION'
    | 'CREATE_RIDER'
    | 'UPDATE_RIDER'
    | 'DELETE_RIDER'
    | 'CREATE_SCAN'
    | 'UPDATE_SCAN'
    | 'DELETE_SCAN'
    | 'CREATE_SCHOOL'
    | 'UPDATE_SCHOOL'
    | 'DELETE_SCHOOL'
    | 'CREATE_STOP'
    | 'UPDATE_STOP'
    | 'DELETE_STOP'
    | 'CREATE_ROUTE'
    | 'UPDATE_ROUTE'
    | 'DELETE_ROUTE'
    | 'ADD_RIDER_TO_STOP'
    | 'REMOVE_RIDER_FROM_STOP'
    | 'ADD_STOP_TO_RIDER'
    | 'REMOVE_STOP_FROM_RIDER'
    | 'LINK_RIDER_TO_GUARDIAN'
    | 'UNLINK_RIDER_FROM_GUARDIAN'

export type RiderTrackerPermissions = RiderTrackerPermission[];

export const permissions: Record<RiderTrackerAction, RiderTrackerPermission> = {
    CREATE_BUS: { action: 'CREATE_BUS', name: 'Create Bus', resourceType: 'buses' },
    UPDATE_BUS: { action: 'UPDATE_BUS', name: 'Update Bus', resourceType: 'buses' },
    DELETE_BUS: { action: 'DELETE_BUS', name: 'Delete Bus', resourceType: 'buses', requiresConfirmation: true },
    CREATE_DRIVER: { action: 'CREATE_DRIVER', name: 'Create Driver', resourceType: 'drivers' },
    UPDATE_DRIVER: { action: 'UPDATE_DRIVER', name: 'Update Driver', resourceType: 'drivers' },
    DELETE_DRIVER: { action: 'DELETE_DRIVER', name: 'Delete Driver', resourceType: 'drivers', requiresConfirmation: true },
    CREATE_GUARDIAN: { action: 'CREATE_GUARDIAN', name: 'Create Guardian', resourceType: 'guardians' },
    UPDATE_GUARDIAN: { action: 'UPDATE_GUARDIAN', name: 'Update Guardian', resourceType: 'guardians' },
    DELETE_GUARDIAN: { action: 'DELETE_GUARDIAN', name: 'Delete Guardian', resourceType: 'guardians', requiresConfirmation: true },
    LINK_GUARDIAN_TO_RIDER: { action: 'LINK_GUARDIAN_TO_RIDER', name: 'Link Guardian to Rider', resourceType: 'guardians' },
    UNLINK_GUARDIAN_FROM_RIDER: { action: 'UNLINK_GUARDIAN_FROM_RIDER', name: 'Unink Guardian from Rider', resourceType: 'guardians' },
    CREATE_ORGANIZATION: { action: 'CREATE_ORGANIZATION', name: 'Create Organization', resourceType: 'organizations' },
    UPDATE_ORGANIZATION: { action: 'UPDATE_ORGANIZATION', name: 'Update Organization', resourceType: 'organizations' },
    DELETE_ORGANIZATION: { action: 'DELETE_ORGANIZATION', name: 'Delete Organization', resourceType: 'organizations', requiresConfirmation: true },
    CREATE_RIDER: { action: 'CREATE_RIDER', name: 'Create Rider', resourceType: 'riders' },
    UPDATE_RIDER: { action: 'UPDATE_RIDER', name: 'Update Rider', resourceType: 'riders' },
    DELETE_RIDER: { action: 'DELETE_RIDER', name: 'Delete Rider', resourceType: 'riders', requiresConfirmation: true },
    CREATE_ROUTE: { action: 'CREATE_ROUTE', name: 'Create Route', resourceType: 'routes' },
    UPDATE_ROUTE: { action: 'UPDATE_ROUTE', name: 'Update Route', resourceType: 'routes' },
    DELETE_ROUTE: { action: 'DELETE_ROUTE', name: 'Delete Route', resourceType: 'routes', requiresConfirmation: true },
    CREATE_SCAN: { action: 'CREATE_SCAN', name: 'Create Scan', resourceType: 'scans' },
    UPDATE_SCAN: { action: 'UPDATE_SCAN', name: 'Update Scan', resourceType: 'scans' },
    DELETE_SCAN: { action: 'DELETE_SCAN', name: 'Delete Scan', resourceType: 'scans', requiresConfirmation: true },
    CREATE_SCHOOL: { action: 'CREATE_SCHOOL', name: 'Create School', resourceType: 'scans' },
    UPDATE_SCHOOL: { action: 'UPDATE_SCHOOL', name: 'Update School', resourceType: 'scans' },
    DELETE_SCHOOL: { action: 'DELETE_SCHOOL', name: 'Delete School', resourceType: 'scans', requiresConfirmation: true },
    CREATE_STOP: { action: 'CREATE_STOP', name: 'Create Stop', resourceType: 'stops' },
    UPDATE_STOP: { action: 'UPDATE_STOP', name: 'Update Stop', resourceType: 'stops' },
    DELETE_STOP: { action: 'DELETE_STOP', name: 'Delete Stop', resourceType: 'stops', requiresConfirmation: true },
    ADD_RIDER_TO_STOP: { action: 'ADD_RIDER_TO_STOP', name: 'Add Rider to Stop', resourceType: 'stops' },
    REMOVE_RIDER_FROM_STOP: { action: 'REMOVE_RIDER_FROM_STOP', name: 'Remove Rider from Stop', resourceType: 'stops', requiresConfirmation: true },
    ADD_STOP_TO_RIDER: { action: 'ADD_RIDER_TO_STOP', name: 'Add Stop to Rider', resourceType: 'stops' },
    REMOVE_STOP_FROM_RIDER: { action: 'REMOVE_STOP_FROM_RIDER', name: 'Remove Stop from Rider', resourceType: 'stops', requiresConfirmation: true },
    LINK_RIDER_TO_GUARDIAN: { action: 'LINK_RIDER_TO_GUARDIAN', name: 'Link Rider to Guardian', resourceType: 'riders' },
    UNLINK_RIDER_FROM_GUARDIAN: { action: 'UNLINK_RIDER_FROM_GUARDIAN', name: 'Unlink Rider from Guardian', resourceType: 'riders' },
};

export const RIDERTRACKER_PERMISSIONS_BY_ROLE: Record<RiderTrackerRole, RiderTrackerPermissions> = {
    RiderTracker_Wizard: Object.values(permissions), // Grant all permissions
    RiderTracker_OrgAdmin: [
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
        permissions.CREATE_ROUTE,
        permissions.UPDATE_ROUTE,
        permissions.DELETE_ROUTE,
        permissions.CREATE_SCAN,
        permissions.UPDATE_SCAN,
        permissions.DELETE_SCAN,
        permissions.CREATE_SCHOOL,
        permissions.UPDATE_SCHOOL,
        permissions.DELETE_SCHOOL,
        permissions.CREATE_STOP,
        permissions.UPDATE_STOP,
        permissions.DELETE_STOP,
        permissions.ADD_RIDER_TO_STOP,
        permissions.REMOVE_RIDER_FROM_STOP,
        permissions.ADD_STOP_TO_RIDER,
        permissions.REMOVE_RIDER_FROM_STOP,
        permissions.LINK_RIDER_TO_GUARDIAN,
        permissions.UNLINK_RIDER_FROM_GUARDIAN
    ],
    RiderTracker_Driver: [
        permissions.UPDATE_BUS,
        permissions.DELETE_BUS,
        permissions.UPDATE_DRIVER,
        permissions.CREATE_RIDER,
        permissions.UPDATE_RIDER,
        permissions.CREATE_SCAN
    ],
    RiderTracker_Guardian: [
        permissions.UPDATE_RIDER
    ]
};
