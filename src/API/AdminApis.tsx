import { handleApiResponse } from '@/helpers/ApiHelpers'
import RiderTrackerAPI from '.'
import { AddressType } from '@/types/AddressType'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { OrganizationType } from '@/types/OrganizationType'

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

const createCognitoUser = async (body: CreateCognitoUserParams) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createCognitoUserResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'createUser' }, body, { ['Content-Type']: 'application/json' })

    return handleApiResponse<AWSUserType>(createCognitoUserResponse)
}

const createUser = async (orgId: string, body: CreateUserParams, options?: Record<string, boolean>) => {
    const { client } = await RiderTrackerAPI.getClient(options?.forceRefresh)
    const createUserResponse = await client.organizationsOrgIdUsersPost({ orgId }, { ...body, stopIds: [''] })

    return handleApiResponse<object>(createUserResponse)
}

const createGuardian = async (guardian: CreateCognitoUserParams, address: AddressType, orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()

    try {
        // First, create the cognito user
        const newCognitoUser = await createCognitoUser(guardian)
        const id = newCognitoUser.User.Username

        // Second, create the new address
        await client.organizationsOrgIdAddressesPost({ orgId }, address)

        // Third, create add the new user to the db
        await createUser(orgId, {
            id,
            orgId,
            firstName: guardian.given_name,
            lastName: guardian.family_name,
            email: guardian.email,
            address: address.id
        })

        // Fourth, add user id to org guardian ids
        const getOrgResponse = await client.organizationsOrgIdGet({ orgId })
        const org: OrganizationType = handleApiResponse(getOrgResponse)
        let newGuardianIds: string[]

        if (!org.guardianIds) {
            newGuardianIds = [id]
        } else {
            newGuardianIds = org.guardianIds.filter((g: string) => g !== '')
            newGuardianIds.push(id)
        }

        await client.organizationsOrgIdPut({ orgId }, { guardianIds: newGuardianIds })

        // Fifth, add the user to the org guardians group
        const addUserToGroupResponse = await addUserToGroup(id, RIDER_TRACKER_ROLES.RIDER_TRACKER_GUARDIAN)

        return addUserToGroupResponse
    } catch (e) {
        throw e as string
    }
}

const addUserToGroup = async (username: string, groupname: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addUserToGroupResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'addUserToGroup' }, { username, groupname })

    return handleApiResponse(addUserToGroupResponse)
}

const removeUserFromGroup = async (username: string, groupname: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const removeUserFromGroupResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'removeUserFromGroup' }, { username, groupname })

    return handleApiResponse<object>(removeUserFromGroupResponse)
}

const updateUserAttributes = async (attributes: AttributeType[], username: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateUserAttributesResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'updateUserAttributes' }, { username, attributes })
    return handleApiResponse<object>(updateUserAttributesResponse)
}

const updateUserProfileImage = async (orgId: string, userId: string, file: File, key: string) => {
    const fileExtension = file.name.split('.').pop()
    const bucket = 'ridertracker.profileimages'
    const fileName = `${key}.${fileExtension}`
    const fullFileName = `${bucket}/${fileName}`

    const { client } = await RiderTrackerAPI.getClient()
    const updateUserProfileImageResponse = await client.adminProxyS3FolderObjectGet({ folder: bucket, object: fileName })

    const putUrl = handleApiResponse<URL>(updateUserProfileImageResponse)

    await fetch(putUrl, {
        method: 'PUT',
        body: file
    })

    return updateUser(orgId, userId, { profileImageKey: fullFileName })
}

const updateUser = async (orgId: string, id: string, body: Record<string, string>) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateUserResponse = await client.organizationsOrgIdUsersIdPut({ orgId, id }, body)

    return handleApiResponse<object>(updateUserResponse)
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

export default {
    createCognitoUser,
    createUser,
    createGuardian,
    updateUserProfileImage,
    updateUserAttributes,
    addUserToGroup,
    removeUserFromGroup
}