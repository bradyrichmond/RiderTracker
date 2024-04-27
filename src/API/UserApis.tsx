import { API_BASE_NAME } from "."

const changeUserPassword = async (token: string, accessToken: string, previousPassword: string, proposedPassword: string) => {
    const changePasswordResponse = await fetch(`${API_BASE_NAME}/users/changeUserPassword`, {
        method: 'POST',
        body: JSON.stringify({ token: accessToken, previousPassword, proposedPassword }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    if (changePasswordResponse.status === 200) {
        const user = await changePasswordResponse.json()

        return user
    } else {
        const error = await changePasswordResponse.json()

        throw `${changePasswordResponse.status}: ${error.message}`
    }
}

const getUserImages = async (token: string, userId: string) => {
    try {
        const imagesData = await fetch(`${API_BASE_NAME}/images/users/${userId}`, {
            headers: {
                'Authorization': token
            }
        })

        const images = await imagesData.json()

        return images
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

export interface UserApiFunctionTypes {
    changeUserPassword(token: string, accessToken: string, previousPassword: string, proposedPassword: string): Promise<void>
    getUserImages(token: string, userId: string): Promise<void>
}

export default {
    changeUserPassword,
    getUserImages
}