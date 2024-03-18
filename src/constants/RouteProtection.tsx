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
    "/riders",
    "/riders/:id",
    "/scans",
    "/scans/:id"
];

export const ROUTE_PROTECTION = [
    {
        name: "RiderTracker_Wizard",
        routes: ALL_ROUTES
    }
]
