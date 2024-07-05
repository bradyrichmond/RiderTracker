export const useDriverStore = () => ({
    getDriverById: async (driverId: string) => ({
        email: 'testuser@ridertracker.com',
        firstName: 'Test',
        id: driverId,
        lastName: 'User',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        stopId: 'e620782f-77c1-4fe6-9139-bb3b6df593f4',
        title: 'Title'
    }),
    drivers: [{
        email: 'testuser@ridertracker.com',
        firstName: 'Test',
        id: '77463cae-8fcd-48c8-a526-a8997a4e167e',
        lastName: 'User',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        stopId: 'e620782f-77c1-4fe6-9139-bb3b6df593f4',
        title: 'Title'
    }],
    updateDrivers: jest.fn()
})