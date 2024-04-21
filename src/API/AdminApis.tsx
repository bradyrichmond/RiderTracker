import { API_BASE_NAME } from "."

interface CreateUserParams {
    given_name: string
    family_name: string
    email: string
}

interface AWSUserType {
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

const createUser = async (token: string, body: CreateUserParams) => {
    const newlyCreatedUser = await fetch(`${API_BASE_NAME}/admin/createUser`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    if (newlyCreatedUser.status === 200) {
        const user = await newlyCreatedUser.json()

        return user
    } else {
        const error = await newlyCreatedUser.json()

        throw `${newlyCreatedUser.status}: ${error.message}`
    }
}

const updateUserProfileImage = async (token: string, file: File, key: string) => {
    const fileExtension = file.name.split('.').pop()

    const newProfilePic = await fetch(`${API_BASE_NAME}/admin/s3/ridertracker.profileimages/${key}.${fileExtension}`, {
        method: 'PUT',
        body: file,
        headers: {
            'Authorization': token
        }
    })

    if (newProfilePic.status === 200) {
        return true
    }
    
    const error = await newProfilePic.json()

    throw `${newProfilePic.status}: ${error.message}`
}

export interface AdminApiFunctionTypes {
    createUser(token: string, body: CreateUserParams): Promise<AWSUserType>
    updateUserProfileImage(token: string, body: File, key: string): Promise<boolean>
}

export default {
    createUser,
    updateUserProfileImage
}