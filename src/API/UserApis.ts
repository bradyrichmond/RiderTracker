import { updatePassword } from '@aws-amplify/auth'
import { GuardianType, UserType } from '@/types/UserType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

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

    deleteUser = async (orgId: string, id: string) => {
        const sk = await this._getUserSortKey(orgId, id)
        const userType = sk.split('#')[0]

        // Need to decide what to do with cognito user

        if (userType === 'ADMIN') {
            this.client.organizationsOrgIdAdminsIdDelete({ orgId, id })
            return
        }

        if (userType === 'GUARDIAN') {
            this.client.organizationsOrgIdGuardiansIdDelete({ orgId, id })
            return
        }

        if (userType === 'DRIVER') {
            this.client.organizationsOrgIdDriversIdDelete({ orgId, id })
            return
        }
    }

    getAdminById = async (orgId: string, id: string) => {
        const getAdminResponse = await this.client.organizationsOrgIdAdminsIdGet({ orgId, id })

        return handleApiResponse<UserType>(getAdminResponse)
    }

    getAdmins = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdAdminsGet({ orgId })

        return handleApiResponse<GuardianType[]>(getUsersResponse)
    }

    getGuardianById = async (orgId: string, id: string) => {
        const getGuardianResponse = await this.client.organizationsOrgIdGuardiansIdGet({ orgId, id })

        return handleApiResponse<GuardianType>(getGuardianResponse)
    }

    getGuardians = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdGuardiansGet({ orgId })

        return handleApiResponse<GuardianType[]>(getUsersResponse)
    }

    getDriverById = async (orgId: string, id: string) => {
        const getDriversResponse = await this.client.organizationsOrgIdDriversIdGet({ orgId, id })

        return handleApiResponse<UserType>(getDriversResponse)
    }

    getDrivers = async (orgId: string) => {
        const getUsersResponse = await this.client.organizationsOrgIdDriversGet({ orgId })

        return handleApiResponse<UserType[]>(getUsersResponse)
    }

    getUserById = async (orgId: string, id: string) => {
        const getDriversResponse = await this.client.organizationsOrgIdDriversIdGet({ orgId, id })

        return handleApiResponse<UserType>(getDriversResponse)
    }

    updateUser = async (orgId: string, id: string, changes: Partial<GuardianType | UserType>) => {
        const sk = await this._getUserSortKey(orgId, id)
        const userType = sk.split('#')[0]

        if (userType === 'ADMIN') {
            this.client.organizationsOrgIdAdminsIdPut({ orgId, id }, changes)
            return
        }

        if (userType === 'GUARDIAN') {
            this.client.organizationsOrgIdGuardiansIdPut({ orgId, id }, changes)
            return
        }

        if (userType === 'DRIVER') {
            this.client.organizationsOrgIdDriversIdPut({ orgId, id }, changes)
            return
        }
    }

    _getUserSortKey = async (orgId: string, id: string) => {
        const response = await this.client.organizationsOrgIdUsersIdGet({ orgId, id })
        const { sk } = handleApiResponse<{ sk: string }>(response)

        return sk
    }
}

export interface UserApiFunctionTypes {
    changeUserPassword(previousPassword: string, proposedPassword: string): Promise<void>
    deleteUser(orgId: string, id: string): Promise<void>
    getAdminById(orgId: string, id: string): Promise<UserType>
    getAdmins(orgId: string): Promise<UserType[]>
    getGuardianById(orgId: string, id: string): Promise<GuardianType>
    getGuardians(orgId: string): Promise<GuardianType[]>
    getDriverById(orgId: string, id: string): Promise<UserType>
    getDrivers(orgId: string): Promise<UserType[]>
    getUserById(orgId: string, id: string): Promise<UserType>
    updateUser(orgId: string, id: string, changes: Partial<UserType>): Promise<void>
}
