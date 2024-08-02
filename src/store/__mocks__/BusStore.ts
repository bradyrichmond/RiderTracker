export const useBusStore = () => ({
    buses: [{
        id: '5c3de479-6401-43f2-88d1-d4a795a4a343',
        busNumber: '42',
        orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
        createdAt: '2024-08-02T18:24:18.246Z',
        updatedAt: '2024-08-02T18:24:18.246Z'
    }],
    getBusById: async (id: string) => {
        return [{
            id,
            busNumber: '42',
            orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
            createdAt: '2024-08-02T18:24:18.246Z',
            updatedAt: '2024-08-02T18:24:18.246Z'
        }]
    },
    updateBuses: jest.fn()
})
