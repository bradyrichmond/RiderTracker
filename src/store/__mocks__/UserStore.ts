export const useUserStore = () => ({
    currentUser: {
        id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
        email: 'eeeemail@ridertracker.com',
        firstName: 'User',
        isAdmin: true,
        isDriver: null,
        isGuardian: null,
        lastName: 'Name',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        title: null,
        createdAt: '2024-08-02T18:23:55.234Z',
        updatedAt: '2024-08-02T18:23:55.234Z'
    },
    updateUsers: jest.fn(),
    users: [
        {
            id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
            email: 'eeeemail@ridertracker.com',
            firstName: 'User',
            isAdmin: true,
            isDriver: null,
            isGuardian: null,
            lastName: 'Name',
            orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
            title: null,
            createdAt: '2024-08-02T18:23:55.234Z',
            updatedAt: '2024-08-02T18:23:55.234Z'
        },
        {
            id: '440f2538-3b5a-4488-99ce-69b332025a9a',
            email: 'EmilyDriver@ridertracker.com',
            firstName: 'Emily',
            isAdmin: null,
            isDriver: true,
            isGuardian: null,
            lastName: 'Driver',
            orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
            title: null,
            createdAt: '2024-08-02T18:23:55.234Z',
            updatedAt: '2024-08-02T18:23:55.234Z'
        },
        {
            id: '1b539fab-d8d0-46aa-a57a-875d986aa108',
            email: 'GinnyGuardian@ridertracker.com',
            firstName: 'Ginny',
            isAdmin: null,
            isDriver: null,
            isGuardian: true,
            lastName: 'Guardian',
            orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
            title: null,
            createdAt: '2024-08-02T18:23:55.234Z',
            updatedAt: '2024-08-02T18:23:55.234Z'
        }
    ],
    signOutAws: jest.fn(),
    updateUserData: jest.fn()
})
