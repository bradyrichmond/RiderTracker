import { handleApiResponse } from '@/helpers/ApiHelpers'
import { AddressType } from '@/types/AddressType'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export interface CreateCognitoUserParams {
    given_name: string
    family_name: string
    email: string
}

export interface AWSUserType {
    User: {
        Attributes: [
            {
                Name: string,
                Value: string
            }
        ],
        Enabled: boolean,
        MFAOptions?: [
            {
                AttributeName?: string,
                DeliveryMedium?: string
            }
        ],
        UserCreateDate: number,
        UserLastModifiedDate: number,
        Username: string,
        UserStatus: string
    }
}

interface AttributeType {
    Name: string, Value: string
}

export enum VERBS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export class AdminApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    createCognitoUser = async (body: CreateCognitoUserParams) => {
        const createCognitoUserResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'createUser' }, body, { ['Content-Type']: 'application/json' })

        return handleApiResponse<AWSUserType>(createCognitoUserResponse)
    }

    createAdmin = async (admin: CreateCognitoUserParams, orgId: string, creatorId: string) => {

        try {
            const newCognitoUser = await this.createCognitoUser(admin)
            const id = newCognitoUser.User.Username

            const createdTime = new Date().getTime()

            await this.client.organizationsOrgIdAdminsPost(orgId, {
                id,
                orgId,
                firstName: admin.given_name,
                lastName: admin.family_name,
                email: admin.email,
                address: '',
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN,
                createdBy: creatorId,
                createdAt: createdTime,
                updatedBy: creatorId,
                updatedAt: createdTime
            })

            const addUserToGroupResponse = await this.addUserToGroup(id, RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN)

            return addUserToGroupResponse
        } catch (e) {
            throw e as string
        }
    }

    disableUser = async (username: string) => {
        await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'disableUser' }, { username }, { ['Content-Type']: 'application/json' })
    }

    createGuardian = async (guardian: CreateCognitoUserParams, address: AddressType, orgId: string, creatorId: string) => {

        try {
            const newCognitoUser = await this.createCognitoUser(guardian)
            const id = newCognitoUser.User.Username

            await this.client.organizationsOrgIdAddressesPost({ orgId }, address)

            const createdTime = new Date().getTime()

            await this.client.organizationsOrgIdGuardiansPost(orgId, {
                id,
                orgId,
                firstName: guardian.given_name,
                lastName: guardian.family_name,
                email: guardian.email,
                address: address.id,
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN,
                createdBy: creatorId,
                createdAt: createdTime,
                updatedBy: creatorId,
                updatedAt: createdTime
            })

            const addUserToGroupResponse = await this.addUserToGroup(id, RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN)

            return addUserToGroupResponse
        } catch (e) {
            throw e as string
        }
    }

    createDriver = async (driver: CreateCognitoUserParams, orgId: string, creatorId: string) => {
        try {
            const newCognitoUser = await this.createCognitoUser(driver)
            const id = newCognitoUser.User.Username

            const createdTime = new Date().getTime()

            await this.client.organizationsOrgIdDriversPost(orgId, {
                id,
                orgId,
                firstName: driver.given_name,
                lastName: driver.family_name,
                email: driver.email,
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER,
                createdBy: creatorId,
                createdAt: createdTime,
                updatedBy: creatorId,
                updatedAt: createdTime
            })

            const addUserToGroupResponse = await this.addUserToGroup(id, RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER)

            return addUserToGroupResponse
        } catch (e) {
            throw e as string
        }
    }

    addUserToGroup = async (username: string, groupname: string) => {
        const addUserToGroupResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'addUserToGroup' }, { username, groupname })

        return handleApiResponse(addUserToGroupResponse)
    }

    removeUserFromGroup = async (username: string, groupname: string) => {
        const removeUserFromGroupResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'removeUserFromGroup' }, { username, groupname })

        return handleApiResponse<object>(removeUserFromGroupResponse)
    }

    updateUserAttributes = async (attributes: AttributeType[], username: string) => {
        const updateUserAttributesResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'updateUserAttributes' }, { username, attributes })
        return handleApiResponse<object>(updateUserAttributesResponse)
    }

    updateUserProfileImage = async (file: File, key: string) => {
        const fileExtension = file.name.split('.').pop()
        const bucket = 'ridertracker.profileimages'
        const fileName = `${key}.${fileExtension}`

        const updateUserProfileImageResponse = await this.client.s3FolderObjectGet({ folder: bucket, object: fileName })

        const putUrl = handleApiResponse<URL>(updateUserProfileImageResponse)

        await fetch(putUrl, {
            method: 'PUT',
            body: file
        })
    }
}

export interface AdminApiFunctionTypes {
    createCognitoUser(body: CreateCognitoUserParams): Promise<AWSUserType>
    createAdmin(admin: CreateCognitoUserParams, orgId: string, creatorId: string): Promise<object>
    createGuardian(guardian: CreateCognitoUserParams, address: AddressType, orgId: string, creatorId: string): Promise<object>
    createDriver(driver: CreateCognitoUserParams, orgId: string, creatorId: string): Promise<object>
    disableUser(username: string): Promise<void>
    updateUserProfileImage(body: File, key: string): Promise<void>
    updateUserAttributes(body: AttributeType[], username: string): Promise<object>
    addUserToGroup(username: string, groupname: string): Promise<object>
    removeUserFromGroup(username: string, groupname: string): Promise<object>
}
