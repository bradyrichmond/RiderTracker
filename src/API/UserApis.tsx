import { updatePassword } from '@aws-amplify/auth'
import { GuardianType, UserType } from '@/types/UserType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

interface PaginationArgs {
    pageSize: number
    lastKey: string
    searchArg: string
}

interface GetUsersArgs {
    orgId: string
    pagination: PaginationArgs
}

export class UserApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    async changeUserPassword(oldPassword: string, newPassword: string) {
        try {
            await updatePassword({ oldPassword, newPassword })
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers({ orgId, pagination }: GetUsersArgs) {
        const getUsersResponse = await this.client.organizationsOrgIdUsersGet({ orgId }, {}, { queryParams: pagination })

        return handleApiResponse<{ items: UserType[], count: number }>(getUsersResponse)
    }

    async getUserById(orgId: string, id: string) {
        const getUserResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })

        return handleApiResponse<UserType>(getUserResponse)
    }

    async getGuardianById(orgId: string, id: string) {
        const getGuardianResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })

        return handleApiResponse<GuardianType>(getGuardianResponse)
    }

    async getUserProfileImage(orgId: string, userId: string) {
        const profileImageResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId, id: userId })

        const response = handleApiResponse<UserType>(profileImageResponse)

        const { profileImageKey } = response
        return profileImageKey
    }

    async getBulkUsersByIds(orgId: string, userIds: string[]) {
        const usersResponse = await this.client.organizationsOrgIdUsersBatchByIdPost({ orgId }, userIds)

        return handleApiResponse<UserType[]>(usersResponse)
    }

    async getBulkGuardiansByIds(orgId: string, userIds: string[]) {
        const usersResponse = await this.client.organizationsOrgIdUsersBatchByIdPost({ orgId }, userIds)

        return handleApiResponse<GuardianType[]>(usersResponse)
    }

    async deleteUser(orgId: string, id: string) {
        const deleteUserResponse = await this.client.organizationsOrgIdUsersIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteUserResponse)
    }

    async updateUser(orgId: string, id: string, body: Record<string, string | string[]>) {
        const updateUserResponse = await this.client.organizationsOrgIdUsersIdPut({ orgId, id }, body)

        return handleApiResponse<object>(updateUserResponse)
    }
}

export interface UserApiFunctionTypes {
    changeUserPassword(previousPassword: string, proposedPassword: string): Promise<void>
    getUserProfileImage(orgId: string, userId: string): Promise<string | undefined>
    getUsers(args: GetUsersArgs): Promise<{ items: UserType[], count: number }>
    getUserById(orgId: string, id: string): Promise<UserType>
    getGuardianById(orgId: string, id: string): Promise<GuardianType>
    getBulkUsersByIds(orgId: string, userIds: string[]): Promise<UserType[]>
    getBulkGuardiansByIds(orgId: string, userIds: string[]): Promise<GuardianType[]>
    deleteUser(orgId: string, id: string): Promise<object>
    updateUser(orgId: string, id: string, body: Record<string, string[]>): Promise<object>
}
