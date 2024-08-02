export const useRiderStore = () => ({
    updateRiders: jest.fn(),
    getRiderById: async (riderId: string) => ({
        id: riderId,
        firstName: 'Randy',
        lastName: 'Rider',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        routeId: ''
    }),
    riders: [{
        id: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c',
        firstName: 'Randy',
        lastName: 'Rider',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        routeId: ''
    }]
})
