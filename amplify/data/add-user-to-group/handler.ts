import { env } from '$amplify/env/add-user-to-group'
import {
    AdminAddUserToGroupCommand,
    AdminAddUserToGroupCommandOutput,
    CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { AppSyncResolverHandler } from 'aws-lambda'

interface HandlerArguments {
    userId: string
    groupName: string
}

export const handler: AppSyncResolverHandler<HandlerArguments, AdminAddUserToGroupCommandOutput> = async (event) => {
    console.log(JSON.stringify(event))
    const { userId, groupName } = event.arguments

    const client = new CognitoIdentityProviderClient()

    const command = new AdminAddUserToGroupCommand({
        Username: userId,
        GroupName: groupName,
        UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    })

    const response = await client.send(command)

    return response
}