export const useRouteStore = () => ({
    routes: [{
        id: '79842a18-8ccc-4f5c-bec2-d9e48e726dd9',
        isActive: true,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riders: ['5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'],
        routeNumber: '42'
    }],
    getActiveRoutes: async () => [{
        id: '79842a18-8ccc-4f5c-bec2-d9e48e726dd9',
        isActive: true,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riders: ['5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'],
        routeNumber: '42'
    }],
    getInactiveRoutes: async () => [{
        id: '79842a18-8ccc-4f5c-bec2-d9e48e726dd9',
        isActive: false,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riders: ['5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'],
        routeNumber: '42'
    }],
    getRouteById: async (routeId: string) => ({
        id: routeId,
        isActive: true,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riders: ['5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'],
        routeNumber: '42'
    }),
    getRoutes: jest.fn()
})