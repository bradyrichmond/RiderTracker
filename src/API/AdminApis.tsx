import { handleApiResponse } from "@/helpers/ApiHelpers"
import RiderTrackerAPI from "."

interface CreateUserParams {
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

const createUser = async (orgId: string, body: CreateUserParams) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createUserResponse = client.organizationsOrgIdUsersPost({ orgId }, body)

    return handleApiResponse(createUserResponse)
}

const addUserToGroup = async (username: string, groupname: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addUserToGroupResponse = await client.adminProxyProxyOptions({ proxy: 'admin/addUserToGroup' }, { username, groupname })

    return handleApiResponse(addUserToGroupResponse)
}

const updateUserAttributes = async (attributes: AttributeType[], username: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateUserAttributesResponse = await client.adminProxyProxyOptions({ proxy: 'admin/updateUserAttributes' }, { username, attributes })
    return handleApiResponse(updateUserAttributesResponse)
}

const updateUserProfileImage = async (orgId: string, userId: string, file: File, key: string) => {
    const fileExtension = file.name.split('.').pop()
    const bucket = 'ridertracker.profileimages'
    const fileName = `${key}.${fileExtension}`
    const fullFileName = `${bucket}/${fileName}`

    const { client } = await RiderTrackerAPI.getClient()
    const updateUserProfileImageResponse = await client.adminProxyS3FolderObjectPut({ folder: bucket, object: fileName }, file)

    handleApiResponse(updateUserProfileImageResponse)
    return updateUser(orgId, userId, { profileImageKey: fullFileName })
}

const updateUser = async (orgId: string, id: string, body: Record<string, string>) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateUserResponse = await client.organizationsOrgIdUsersIdPut({ orgId, id }, body)

    return handleApiResponse(updateUserResponse)
}

export interface AdminApiFunctionTypes {
    createUser(orgId: string, body: CreateUserParams): Promise<any>
    updateUserProfileImage(orgId: string, userId: string, body: File, key: string): Promise<any>
    updateUserAttributes(body: AttributeType[], username: string): Promise<any>
    addUserToGroup(username: string, groupname: string): Promise<any>
}

export default {
    createUser,
    updateUserProfileImage,
    updateUserAttributes,
    addUserToGroup
}