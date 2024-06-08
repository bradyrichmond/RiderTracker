import { updatePassword } from '@aws-amplify/auth'
import { GuardianType, UserType } from '@/types/UserType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'

export class UserApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    changeUserPassword = async (oldPassword: string, newPassword: string) => {
        try {
            await updatePassword({ oldPassword, newPassword })
        } catch (e) {
            console.log(e)
        }
    }

    getUsers = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdUsersGet({ orgId }, {})

        return handleApiResponse<UserType[]>(getUsersResponse)
    }

    getUserById = async (orgId: string, id: string) => {
        const getUserResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })

        return handleApiResponse<UserType>(getUserResponse)
    }

    getAdmins = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdUsersGet({ orgId }, {}, {
            queryParams: {
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN
            }
        })

        return handleApiResponse<GuardianType[]>(getUsersResponse)
    }

    getAdminById = async (orgId: string, id: string) => {
        const getAdminResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })

        return handleApiResponse<UserType>(getAdminResponse)
    }

    getGuardians = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdUsersGet({ orgId }, {}, {
            queryParams: {
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN
            }
        })

        return handleApiResponse<GuardianType[]>(getUsersResponse)
    }

    getGuardianById = async (orgId: string, id: string) => {
        const getGuardianResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })

        return handleApiResponse<GuardianType>(getGuardianResponse)
    }

    getDrivers = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdUsersGet({ orgId }, {}, {
            queryParams: {
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER
            }
        })

        return handleApiResponse<UserType[]>(getUsersResponse)
    }

    getDriverById = async (orgId: string, id: string) => {
        const getDriversResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })

        return handleApiResponse<UserType>(getDriversResponse)
    }

    getUserProfileImage = async (orgId: string, userId: string) => {
        const profileImageResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id: userId })

        const response = handleApiResponse<UserType>(profileImageResponse)

        const { profileImageKey } = response
        return profileImageKey
    }

    getBulkUsersByIds = async (orgId: string, userIds: string[]) => {
        const usersResponse = await this.client.organizationsOrgIdUsersBatchByIdPost({ orgId }, userIds)

        return handleApiResponse<UserType[]>(usersResponse)
    }

    getBulkGuardiansByIds = async (orgId: string, userIds: string[]) => {
        const usersResponse = await this.client.organizationsOrgIdUsersBatchByIdPost({ orgId }, userIds)

        return handleApiResponse<GuardianType[]>(usersResponse)
    }

    deleteUser = async (orgId: string, id: string) => {
        const deleteUserResponse = await this.client.organizationsOrgIdUsersIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteUserResponse)
    }

    updateUser = async (orgId: string, id: string, body: Partial<UserType | GuardianType>) => {
        const updateUserResponse = await this.client.organizationsOrgIdUsersIdPut({ orgId, id }, body)

        return handleApiResponse<object>(updateUserResponse)
    }
}

export interface UserApiFunctionTypes {
    changeUserPassword(previousPassword: string, proposedPassword: string): Promise<void>
    getUserProfileImage(orgId: string, userId: string): Promise<string | undefined>
    getUsers(orgId: string): Promise<UserType[]>
    getUserById(orgId: string, id: string): Promise<UserType>
    getAdmins(orgId: string): Promise<UserType[]>
    getAdminById(orgId: string, id: string): Promise<UserType>
    getGuardians(orgId: string): Promise<GuardianType[]>
    getGuardianById(orgId: string, id: string): Promise<GuardianType>
    getDrivers(orgId: string): Promise<UserType[]>
    getDriverById(orgId: string, id: string): Promise<UserType>
    getBulkUsersByIds(orgId: string, userIds: string[]): Promise<UserType[]>
    getBulkGuardiansByIds(orgId: string, userIds: string[]): Promise<GuardianType[]>
    deleteUser(orgId: string, id: string): Promise<object>
    updateUser(orgId: string, id: string, body: Partial<UserType | GuardianType>): Promise<object>
}
