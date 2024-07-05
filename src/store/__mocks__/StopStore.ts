
export const useStopStore = () => ({
    stops: [{
        id: '0964d0c8-97e5-4408-9de2-42a88eae2093',
        name: 'Fluffy Flamingo',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riderIds: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c',
        routeId: '79842a18-8ccc-4f5c-bec2-d9e48e726dd9'
    }],
    getStopById: async (stopId: string) => ({
        id: stopId,
        name: 'Fluffy Flamingo',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riderIds: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c',
        routeId: '79842a18-8ccc-4f5c-bec2-d9e48e726dd9'
    }),
    getStops: jest.fn()
})