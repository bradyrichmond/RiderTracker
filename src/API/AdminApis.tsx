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
    try {
        const newlyCreatedUser = await fetch(`${API_BASE_NAME}/admin/createUser`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const user = await newlyCreatedUser.json()

        return user
    } catch (e) {
        //@ts-ignore
        throw new Error(e)
    }
}

export interface AdminApiFunctionTypes {
    createUser(token: string, body: CreateUserParams): Promise<AWSUserType>
}

export default {
    createUser
}