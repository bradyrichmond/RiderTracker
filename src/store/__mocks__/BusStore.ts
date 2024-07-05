export const useBusStore = () => ({
    buses: [{
        id: '1850fe3d-531e-48db-a6de-c12ba360e45d',
        busNumber: '42',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06'
    }],
    getBusById: async (busId: string) => {
        return [{
            id: busId,
            busNumber: '42',
            orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06'
        }]
    },
    updateBuses: jest.fn()
})
