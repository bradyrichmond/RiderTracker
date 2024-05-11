import { handleApiResponse } from "@/helpers/ApiHelpers"
import RiderTrackerAPI from "."

interface CreateUserParams {
    id: string
    orgId: string
    firstName: string
    lastName: string
    email: string
    stopIds?: string[]
    address?: string
}

interface CreateCognitoUserParams {
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

export enum VERBS{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

const createCognitoUser = async (body: CreateCognitoUserParams) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createCognitoUserResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'createUser' }, body, { ["Content-Type"]: "application/json" })

    return handleApiResponse(createCognitoUserResponse)
}

const createUser = async (orgId: string, body: CreateUserParams, options?: Record<string, boolean>) => {
    const { client } = await RiderTrackerAPI.getClient(options?.forceRefresh)
    const createUserResponse = await client.organizationsOrgIdUsersPost({ orgId }, { ...body, stopIds: [""] })

    return handleApiResponse(createUserResponse)
}

const addUserToGroup = async (username: string, groupname: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addUserToGroupResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'addUserToGroup' }, { username, groupname })

    return handleApiResponse(addUserToGroupResponse)
}

const removeUserFromGroup = async (username: string, groupname: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const removeUserFromGroupResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'removeUserFromGroup' }, { username, groupname })

    return handleApiResponse(removeUserFromGroupResponse)
}

const updateUserAttributes = async (attributes: AttributeType[], username: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateUserAttributesResponse = await client.adminProxyProxyAny(VERBS.POST, { proxy: 'updateUserAttributes' }, { username, attributes })
    return handleApiResponse(updateUserAttributesResponse)
}

const updateUserProfileImage = async (orgId: string, userId: string, file: File, key: string) => {
    const fileExtension = file.name.split('.').pop()
    const bucket = 'ridertracker.profileimages'
    const fileName = `${key}.${fileExtension}`
    const fullFileName = `${bucket}/${fileName}`

    const { client } = await RiderTrackerAPI.getClient()
    const updateUserProfileImageResponse = await client.adminProxyS3FolderObjectGet({ folder: bucket, object: fileName })

    const putUrl = handleApiResponse(updateUserProfileImageResponse)

    await fetch(putUrl, {
        method: 'PUT',
        body: file
    })

    return updateUser(orgId, userId, { profileImageKey: fullFileName })
}

const updateUser = async (orgId: string, id: string, body: Record<string, string>) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateUserResponse = await client.organizationsOrgIdUsersIdPut({ orgId, id }, body)

    return handleApiResponse(updateUserResponse)
}

export interface AdminApiFunctionTypes {
    createCognitoUser(body: CreateCognitoUserParams): Promise<AWSUserType>
    createUser(orgId: string, body: CreateUserParams, options?: Record<string, boolean>): Promise<any>
    updateUserProfileImage(orgId: string, userId: string, body: File, key: string): Promise<any>
    updateUserAttributes(body: AttributeType[], username: string): Promise<any>
    addUserToGroup(username: string, groupname: string): Promise<any>
    removeUserFromGroup(username: string, groupname: string): Promise<any>
}

export default {
    createCognitoUser,
    createUser,
    updateUserProfileImage,
    updateUserAttributes,
    addUserToGroup,
    removeUserFromGroup
}