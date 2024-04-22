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

export interface UserApiFunctionTypes {
    changeUserPassword(token: string, accessToken: string, previousPassword: string, proposedPassword: string): Promise<void>
}

export default {
    changeUserPassword
}