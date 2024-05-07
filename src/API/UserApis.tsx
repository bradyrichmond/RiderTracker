import { updatePassword } from "@aws-amplify/auth"
import RiderTrackerAPI from "."
import { GuardianType, UserType } from "@/types/UserType"
import { handleApiResponse } from "@/helpers/ApiHelpers"

const changeUserPassword = async (oldPassword: string, newPassword: string) => {
    try {
        await updatePassword({ oldPassword, newPassword })
    } catch (e: any) {
        console.log(e)
    }
}

const getUsers = async (orgId: string) => {
    const api = await RiderTrackerAPI.getClient()
    const getUsersResponse = await api.client.organizationsOrgIdUsersGet({ orgId })
    
    return handleApiResponse(getUsersResponse)
}

const getUserById = async (orgId: string, id: string) => {
    const api = await RiderTrackerAPI.getClient()
    const getUserResponse = await api.client.organizationsOrgIdUsersIdGet({ orgId, id })
    
    return handleApiResponse(getUserResponse)
}

const getGuardianById = async (orgId: string, id: string) => {
    const api = await RiderTrackerAPI.getClient()
    const getGuardianResponse = await api.client.organizationsOrgIdUsersIdGet({ orgId, id })
    
    return handleApiResponse(getGuardianResponse)
}

const getUserProfileImage = async (orgId: string, userId: string) => {
    const api = await RiderTrackerAPI.getClient()
    const profileImageResponse = await api.client.organizationsOrgIdUsersIdGet({ orgId, id: userId })

    const response = handleApiResponse(profileImageResponse)

    const { profileImageKey } = response
    return profileImageKey
}

const getBulkUsersByIds = async (orgId: string, userIds: string[]) => {
    const api = await RiderTrackerAPI.getClient()
    const usersResponse = await api.client.organizationsOrgIdUsersBatchByIdPost({ orgId }, userIds)
    
    return handleApiResponse(usersResponse)
}

const deleteUser = async (orgId: string, id: string) => {
    const api = await RiderTrackerAPI.getClient()
    const deleteUserResponse = await api.client.organizationsOrgIdUsersIdDelete({ orgId, id })
    
    return handleApiResponse(deleteUserResponse)
}

const updateUser = async (orgId: string, id: string, body: Record<string, string | string[]>) => {
    const api = await RiderTrackerAPI.getClient()
    const updateUserResponse = await api.client.organizationsOrgIdUsersIdPut({ orgId, id }, body)
    
    return handleApiResponse(updateUserResponse)
}

export interface UserApiFunctionTypes {
    changeUserPassword(previousPassword: string, proposedPassword: string): Promise<void>
    getUserProfileImage(orgId: string, userId: string): Promise<string>
    getUsers(orgId: string): Promise<UserType[]>
    getUserById(orgId: string, id: string): Promise<UserType>
    getGuardianById(orgId: string, id: string): Promise<GuardianType>
    getBulkUsersByIds(orgId: string, userIds: string[]): Promise<UserType[]>
    deleteUser(orgId: string, id: string): Promise<any>
    updateUser(orgId: string, id: string, body: Record<string, string[]>): Promise<any>
}

export default {
    changeUserPassword,
    getUserProfileImage,
    getUsers,
    getUserById,
    getBulkUsersByIds,
    deleteUser,
    updateUser,
    getGuardianById
}