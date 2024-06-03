import { RIDER_TRACKER_ROLES } from '@/constants/Roles'

const mockGetUsers = async (orgId: string) => [
    {
        id: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        address: 'b3f0157c-e118-4fda-a734-f590dc5aa35b',
        email: 'thebriz+athomp@gmail.com',
        firstName: 'Amanda',
        lastName: 'Thompson',
        orgId,
        profileImageKey: '',
        stopIds: ['']
    },
    {
        id: '74eed560-d287-4f69-b9db-aa09bd904e06',
        address: '',
        email: 'thebriz+pooooooo@gmail.com',
        firstName: 'BRady',
        lastName: 'Richmond',
        orgId,
        profileImageKey: '',
        stopIds: ['']
    },
    {
        id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
        address: '',
        email: 'thebriz+tttttttttttt@gmail.com',
        firstName: 'Trigger',
        lastName: 'Test',
        orgId,
        profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
        stopIds: ['']
    }
]

const mockGetUserById = async (orgId: string, id: string) => ({
    id,
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Trigger',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: ['']
})

const mockGetAdmins = async (orgId: string) => [{
    id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Trigger',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: [''],
    userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN
}]

const mockGetAdminById = async (orgId: string, id: string) => ({
    id,
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Trigger',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: [''],
    userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN
})

const mockGetGuardians = async (orgId: string) => [{
    id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Trigger',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: [''],
    userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN
}]

const mockGetGuardianById = async (orgId: string) => ({
    id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Trigger',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: [''],
    userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN
})

const mockGetDrivers = async (orgId: string) => [{
    id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Emily',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: [''],
    userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER
}]

const mockGetDriverById = async (orgId: string) => ({
    id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
    address: '',
    email: 'thebriz+tttttttttttt@gmail.com',
    firstName: 'Emily',
    lastName: 'Test',
    orgId,
    profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
    stopIds: [''],
    userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER
})

const mockGetUserProfileImage = async (orgId: string, userId: string) => {
    return `${orgId}-${userId}`
}

const mockGetBulkUsersById = async (orgId: string) => [
    {
        id: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        address: 'b3f0157c-e118-4fda-a734-f590dc5aa35b',
        email: 'thebriz+athomp@gmail.com',
        firstName: 'Amanda',
        lastName: 'Thompson',
        orgId,
        profileImageKey: '',
        stopIds: ['']
    },
    {
        id: '74eed560-d287-4f69-b9db-aa09bd904e06',
        address: '',
        email: 'thebriz+pooooooo@gmail.com',
        firstName: 'BRady',
        lastName: 'Richmond',
        orgId,
        profileImageKey: '',
        stopIds: ['']
    },
    {
        id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
        address: '',
        email: 'thebriz+tttttttttttt@gmail.com',
        firstName: 'Trigger',
        lastName: 'Test',
        orgId,
        profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
        stopIds: ['']
    }
]

const mockGetBulkGuardiansById = async (orgId: string[]) => [
    {
        id: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        address: 'b3f0157c-e118-4fda-a734-f590dc5aa35b',
        email: 'thebriz+athomp@gmail.com',
        firstName: 'Amanda',
        lastName: 'Thompson',
        orgId,
        profileImageKey: '',
        stopIds: [''],
        userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN
    },
    {
        id: '74eed560-d287-4f69-b9db-aa09bd904e06',
        address: '',
        email: 'thebriz+pooooooo@gmail.com',
        firstName: 'BRady',
        lastName: 'Richmond',
        orgId,
        profileImageKey: '',
        stopIds: [''],
        userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN
    },
    {
        id: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
        address: '',
        email: 'thebriz+tttttttttttt@gmail.com',
        firstName: 'Trigger',
        lastName: 'Test',
        orgId,
        profileImageKey: 'ridertracker.profileimages/ac7a22c5-5e28-46d5-ac26-18b54eb5a337.jpg',
        stopIds: [''],
        userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN
    }
]

const mockDeleteUser = async () => { }

const mockUpdateUser = async () => { }

const mockChangeUserPassword = async () => { }

export const UserApis = jest.fn().mockImplementation(() => ({
    getUsers: mockGetUsers,
    getUserById: mockGetUserById,
    getAdmins: mockGetAdmins,
    getAdminById: mockGetAdminById,
    getGuardians: mockGetGuardians,
    getGuardianById: mockGetGuardianById,
    getBulkGuardiansById: mockGetBulkGuardiansById,
    getDrivers: mockGetDrivers,
    getDriverById: mockGetDriverById,
    getBulkUsersById: mockGetBulkUsersById,
    mockGetUserProfileImage: mockGetUserProfileImage,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
    changeUserPassword: mockChangeUserPassword
}))
