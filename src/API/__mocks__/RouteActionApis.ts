const mockGetRouteActions = async (orgId: string) => [{
    actionType: 'route_begin',
    driverId: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    id: '4e60aca9-628f-4cb6-9456-20a0796c166e',
    orgId,
    routeId: '72bc1fa7-4d6c-413a-a7ca-8843da5fcd88',
    createdBy: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    createdDate: '1718392660306',
    lastEditedBy: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    lastEditDate: '1718392660306'
}]

const mockGetRouteActionsByDriverId = async (orgId: string, driverId: string) => [{
    actionType: 'route_begin',
    driverId,
    id: '4e60aca9-628f-4cb6-9456-20a0796c166e',
    orgId,
    routeId: '72bc1fa7-4d6c-413a-a7ca-8843da5fcd88',
    createdBy: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    createdDate: '1718392660306',
    lastEditedBy: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    lastEditDate: '1718392660306'
}]

const mockGetRouteActionsByRouteId = async (orgId: string, routeId: string) => [{
    actionType: 'route_begin',
    driverId: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    id: '4e60aca9-628f-4cb6-9456-20a0796c166e',
    orgId,
    routeId,
    createdBy: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    createdDate: '1718392660306',
    lastEditedBy: 'ae010e55-c8d8-4957-a5b6-259fba09de69',
    lastEditDate: '1718392660306'
}]

const mockCreateRouteAction = async () => { }

export const RouteActionApis = jest.fn().mockImplementation(() => ({
    getRouteActions: mockGetRouteActions,
    getRouteActionsByDriverId: mockGetRouteActionsByDriverId,
    getRouteActionsByRouteId: mockGetRouteActionsByRouteId,
    createRouteAction: mockCreateRouteAction
}))
