import { env } from '$amplify/env/add-user-to-group'
import {
    AdminCreateUserCommand,
    AdminCreateUserCommandInput,
    AdminCreateUserCommandOutput,
    CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { AppSyncResolverHandler } from 'aws-lambda'

interface CreateOrgUserInput {
    email: string
    family_name: string
    given_name: string
    orgId: string
}

const client = new CognitoIdentityProviderClient()

export const handler: AppSyncResolverHandler<CreateOrgUserInput, AdminCreateUserCommandOutput> = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`)
    const { email, family_name, given_name, orgId } = event.arguments
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
            },
            {
                Name: 'custom:orgId',
                Value: orgId
            }
        ],
        Username: email,
        UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    }

    console.log(JSON.stringify(commandInput))

    const command = new AdminCreateUserCommand(commandInput)

    const response = await client.send(command)

    if (response) {
        return response
    }

    throw 'Failed to create user'
}