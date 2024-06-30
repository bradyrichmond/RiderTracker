import { env } from '$amplify/env/add-user-to-group'
import {
    AdminCreateUserCommand,
    AdminCreateUserCommandInput,
    AdminCreateUserCommandOutput,
    CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { Handler } from 'aws-lambda'

interface CreateOrgUserInput {
    email: string
    family_name: string
    given_name: string
    password: string
}

const client = new CognitoIdentityProviderClient()

export const handler: Handler<CreateOrgUserInput, AdminCreateUserCommandOutput> = async (event) => {
    const { email, family_name, given_name } = event
    const commandInput: AdminCreateUserCommandInput = {
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
    }

    const command = new AdminCreateUserCommand(commandInput)

    const response = await client.send(command)

    if (response) {
        return response
    }

    throw 'Failed to create user'
}