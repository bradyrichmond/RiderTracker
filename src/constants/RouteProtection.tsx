const ALL_ROUTES: string[] = [
    "/",
    "/buses",
    "/buses/:id",
    "/drivers",
    "/drivers/:id",
    "/guardians",
    "/guardians/:id",
    "/organizations",
    "/organizations/:id",
    "/organizations/:id/buses",
    "/organizations/:id/drivers",
    "/organizations/:id/guardians",
    "/organizations/:id/riders",
    "/organizations/:id/scans",
    "/riders",
    "/riders/:id",
    "/riders/:id/scans",
    "/scans",
    "/scans/:id"
];

export const ROUTE_PROTECTION = [
    {
        name: "RiderTracker_Wizard",
        routes: ALL_ROUTES
    }
]
