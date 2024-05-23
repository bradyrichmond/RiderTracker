import { handleApiResponse } from '@/helpers/ApiHelpers'
import { AddressType } from '@/types/AddressType'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { OrganizationType } from '@/types/OrganizationType'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

interface CreateUserParams {
    id: string
    orgId: string
    firstName: string
    lastName: string
    email: string
    stopIds?: string[]
    riderIds?: string[]
    address?: string
}

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

    async createCognitoUser(body: CreateCognitoUserParams) {
        const createCognitoUserResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'createUser' }, body, { ['Content-Type']: 'application/json' })
    
        return handleApiResponse<AWSUserType>(createCognitoUserResponse)
    }
    
    async createUser(orgId: string, body: CreateUserParams) {
        const createUserResponse = await this.client.organizationsOrgIdUsersPost({ orgId }, { ...body, stopIds: [''] })
    
        return handleApiResponse<object>(createUserResponse)
    }
    
    async createGuardian(guardian: CreateCognitoUserParams, address: AddressType, orgId: string) {
    
        try {
            // First, create the cognito user
            const newCognitoUser = await this.createCognitoUser(guardian)
            const id = newCognitoUser.User.Username
    
            // Second, create the new address
            await this.client.organizationsOrgIdAddressesPost({ orgId }, address)
    
            // Third, create add the new user to the db
            await this.createUser(orgId, {
                id,
                orgId,
                firstName: guardian.given_name,
                lastName: guardian.family_name,
                email: guardian.email,
                address: address.id
            })
    
            // Fourth, add user id to org guardian ids
            const getOrgResponse = await this.client.organizationsOrgIdGet({ orgId })
            const org: OrganizationType = handleApiResponse(getOrgResponse)
            let newGuardianIds: string[]
    
            if (!org.guardianIds) {
                newGuardianIds = [id]
            } else {
                newGuardianIds = org.guardianIds.filter((g: string) => g !== '')
                newGuardianIds.push(id)
            }
    
            await this.client.organizationsOrgIdPut({ orgId }, { guardianIds: newGuardianIds })
    
            // Fifth, add the user to the org guardians group
            const addUserToGroupResponse = await this.addUserToGroup(id, RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN)
    
            return addUserToGroupResponse
        } catch (e) {
            throw e as string
        }
    }
    
    async addUserToGroup(username: string, groupname: string) {
        const addUserToGroupResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'addUserToGroup' }, { username, groupname })
    
        return handleApiResponse(addUserToGroupResponse)
    }
    
    async removeUserFromGroup(username: string, groupname: string) {
        const removeUserFromGroupResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'removeUserFromGroup' }, { username, groupname })
    
        return handleApiResponse<object>(removeUserFromGroupResponse)
    }
    
    async updateUserAttributes(attributes: AttributeType[], username: string) {
        const updateUserAttributesResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'updateUserAttributes' }, { username, attributes })
        return handleApiResponse<object>(updateUserAttributesResponse)
    }
    
    async updateUserProfileImage(orgId: string, userId: string, file: File, key: string) {
        const fileExtension = file.name.split('.').pop()
        const bucket = 'ridertracker.profileimages'
        const fileName = `${key}.${fileExtension}`
        const fullFileName = `${bucket}/${fileName}`
    
        const updateUserProfileImageResponse = await this.client.adminProxyS3FolderObjectGet({ folder: bucket, object: fileName })
    
        const putUrl = handleApiResponse<URL>(updateUserProfileImageResponse)
    
        await fetch(putUrl, {
            method: 'PUT',
            body: file
        })
    
        return this.updateUser(orgId, userId, { profileImageKey: fullFileName })
    }
    
    async updateUser(orgId: string, id: string, body: Record<string, string>) {
        const updateUserResponse = await this.client.organizationsOrgIdUsersIdPut({ orgId, id }, body)
    
        return handleApiResponse<object>(updateUserResponse)
    }
}

export interface AdminApiFunctionTypes {
    createCognitoUser(body: CreateCognitoUserParams): Promise<AWSUserType>
    createUser(orgId: string, body: CreateUserParams, options?: Record<string, boolean>): Promise<object>
    createGuardian(guardian: CreateCognitoUserParams, address: AddressType, orgId: string): Promise<object>
    updateUserProfileImage(orgId: string, userId: string, body: File, key: string): Promise<object>
    updateUserAttributes(body: AttributeType[], username: string): Promise<object>
    addUserToGroup(username: string, groupname: string): Promise<object>
    removeUserFromGroup(username: string, groupname: string): Promise<object>
}
