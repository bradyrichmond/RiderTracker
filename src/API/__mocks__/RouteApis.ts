const mockGetRoutes = async (orgId: string) => [
    {
        id: '72bc1fa7-4d6c-413a-a7ca-8843da5fcd88',
        orgId,
        routeNumber: '42',
        stopIds: ['a49d2de3-bfbc-4517-be28-42a93729f9b9'],
        riderIds: ['12cb7395-cff8-4cfb-a176-5c04252bc49c', '135f6a91-fc64-458a-9ef0-9cea50577c76', '36f971a7-0d77-42f3-99aa-a7c20a99e6e4']
    },
    {
        id: '5ee2cc2d-9237-444b-bf76-b02ec8032991',
        orgId,
        routeNumber: '7'
    },
    {
        id: '9aa6c699-d2f6-4c73-b993-43d35938bcb1',
        orgId,
        routeNumber: '13'
    }
]

const mockGetRouteById = async (orgId: string, id: string) => ({
    id,
    orgId,
    routeNumber: '13'
})

const mockCreateRoute = async () => { }

const mockUpdateRoute = async () => { }

const mockDeleteRoute = async () => { }

export const RouteApis = jest.fn().mockImplementation(() => ({
    getRoutes: mockGetRoutes,
    getRouteById: mockGetRouteById,
    updateRoute: mockUpdateRoute,
    createRoute: mockCreateRoute,
    deleteRoute: mockDeleteRoute
}))
