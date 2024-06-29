import { env } from '$amplify/env/add-user-to-group'
import {
    AdminCreateUserCommand,
    AdminCreateUserCommandOutput,
    CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { Handler } from 'aws-lambda'

interface CreateOrgAdminInput {
    email: string
    family_name: string
    given_name: string
}

const client = new CognitoIdentityProviderClient()

export const handler: Handler<CreateOrgAdminInput, AdminCreateUserCommandOutput> = async (event) => {
    const { email, family_name, given_name } = event
    const command = new AdminCreateUserCommand({
        DesiredDeliveryMediums: ['EMAIL'],
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'family_name',
                Value: family_name
            },
            {
                Name: 'given_name',
                Value: given_name
            }
        ],
        Username: email,
        UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    })

    const response = await client.send(command)

    if (response) {
        return response
    }

    throw 'Failed to create user'
}