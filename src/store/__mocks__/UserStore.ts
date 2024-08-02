export const useUserStore = () => ({
    currentUser: {
        id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
        email: 'eeeemail@ridertracker.com',
        firstName: 'User',
        isAdmin: true,
        isDriver: null,
        isGuardian: null,
        lastName: 'Name',
        orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
        title: null,
        createdAt: '2024-08-02T18:23:55.234Z',
        updatedAt: '2024-08-02T18:23:55.234Z'
    },
    getUsers: async () => {
        return [
            {
                id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
                email: 'eeeemail@ridertracker.com',
                firstName: 'User',
                isAdmin: true,
                isDriver: null,
                isGuardian: null,
                lastName: 'Name',
                orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
                title: null,
                createdAt: '2024-08-02T18:23:55.234Z',
                updatedAt: '2024-08-02T18:23:55.234Z'
            }
        ]
    },
    users: [{
        id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
        email: 'eeeemail@ridertracker.com',
        firstName: 'User',
        isAdmin: true,
        isDriver: null,
        isGuardian: null,
        lastName: 'Name',
        orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
        title: null,
        createdAt: '2024-08-02T18:23:55.234Z',
        updatedAt: '2024-08-02T18:23:55.234Z'
    }],
    signOutAws: jest.fn(),
    updateUserData: jest.fn()
})
