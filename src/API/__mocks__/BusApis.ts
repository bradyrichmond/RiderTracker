const mockGetBusById = async (busId: string) => Promise.resolve({
    id: busId,
    busNumber: '420',
    orgId: '123'
})

const mockGetBuses = async (orgId: string) => Promise.resolve([
    {
        id: 'b19d7f92-c969-457a-84e0-bf64e986ed6a',
        busNumber: '267',
        orgId: orgId
    },
    {
        id: '7888888888',
        busNumber: '12',
        orgId: orgId
    },
    {
        id: '{12-341-222-12-22}',
        busNumber: '3',
        orgId: orgId
    },
    {
        id: '424-787-111',
        busNumber: '469',
        orgId: orgId
    },
    {
        id: 'e8b3ff46-0024-437e-9e75-f0e319a92cea',
        busNumber: '69',
        orgId: orgId
    },
    {
        id: '9a381019-c1db-41a0-93c8-c9994f96edb4',
        busNumber: '420',
        orgId: orgId
    }
])

const mockCreateBus = async () => Promise.resolve({})

const mockDeleteBus = async () => Promise.resolve({})

export const BusApis = jest.fn().mockImplementation(() => ({
    getBuses: mockGetBuses,
    getBusById: mockGetBusById,
    createBus: mockCreateBus,
    deleteBus: mockDeleteBus
}))
