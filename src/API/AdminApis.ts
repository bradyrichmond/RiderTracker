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
    userType?: RIDER_TRACKER_ROLES,
    createdBy: string,
    createdDate: number,
    lastEditedBy: string,
    lastEditDate: number
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

    createCognitoUser = async (body: CreateCognitoUserParams) => {
        const createCognitoUserResponse = await this.client.adminProxyProxyAny(VERBS.POST, { proxy: 'createUser' }, body, { ['Content-Type']: 'application/json' })

        return handleApiResponse<AWSUserType>(createCognitoUserResponse)
    }

    createUser = async (orgId: string, body: CreateUserParams) => {
        const createUserResponse = await this.client.organizationsOrgIdUsersPost({ orgId }, JSON.stringify({ ...body, stopIds: [''] }))

        return handleApiResponse<object>(createUserResponse)
    }

    createAdmin = async (admin: CreateCognitoUserParams, orgId: string, creatorId: string) => {

        try {
            const newCognitoUser = await this.createCognitoUser(admin)
            const id = newCognitoUser.User.Username

            await this.createUser(orgId, {
                id,
                orgId,
                firstName: admin.given_name,
                lastName: admin.family_name,
                email: admin.email,
                address: '',
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_ORGADMIN,
                createdBy: creatorId,
                createdDate: new Date().getTime(),
                lastEditedBy: creatorId,
                lastEditDate: new Date().getTime()
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

            await this.createUser(orgId, {
                id,
                orgId,
                firstName: guardian.given_name,
                lastName: guardian.family_name,
                email: guardian.email,
                address: address.id,
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN,
                createdBy: creatorId,
                createdDate: new Date().getTime(),
                lastEditedBy: creatorId,
                lastEditDate: new Date().getTime()
            })

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

            await this.createUser(orgId, {
                id,
                orgId,
                firstName: driver.given_name,
                lastName: driver.family_name,
                email: driver.email,
                userType: RIDER_TRACKER_ROLES.RIDER_TRACKER_DRIVER,
                createdBy: creatorId,
                createdDate: createdTime,
                lastEditedBy: creatorId,
                lastEditDate: createdTime
            })

            const getOrgResponse = await this.client.organizationsOrgIdGet({ orgId })
            const org: OrganizationType = handleApiResponse(getOrgResponse)
            let newDriverIds: string[] | undefined = org.driverIds?.filter((g: string) => g !== '')

            if (!org.guardianIds) {
                newDriverIds = []
            }

            newDriverIds?.push(id)

            await this.client.organizationsOrgIdPut({ orgId }, { driverIds: newDriverIds })

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

    updateUserProfileImage = async (orgId: string, userId: string, file: File, key: string) => {
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

    updateUser = async (orgId: string, id: string, body: Record<string, string>) => {
        const updateUserResponse = await this.client.organizationsOrgIdUsersIdPut({ orgId, id }, body)

        return handleApiResponse<object>(updateUserResponse)
    }
}

export interface AdminApiFunctionTypes {
    createCognitoUser(body: CreateCognitoUserParams): Promise<AWSUserType>
    createUser(orgId: string, body: CreateUserParams, options?: Record<string, boolean>): Promise<object>
    createAdmin(admin: CreateCognitoUserParams, orgId: string, creatorId: string): Promise<object>
    createGuardian(guardian: CreateCognitoUserParams, address: AddressType, orgId: string, creatorId: string): Promise<object>
    createDriver(driver: CreateCognitoUserParams, orgId: string, creatorId: string): Promise<object>
    disableUser(username: string): Promise<void>
    updateUserProfileImage(orgId: string, userId: string, body: File, key: string): Promise<object>
    updateUserAttributes(body: AttributeType[], username: string): Promise<object>
    addUserToGroup(username: string, groupname: string): Promise<object>
    removeUserFromGroup(username: string, groupname: string): Promise<object>
}
