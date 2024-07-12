import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import { generateClient } from 'aws-amplify/api'
import type { PostConfirmationTriggerHandler, PostConfirmationTriggerEvent } from 'aws-lambda'
import { Schema } from '../../data/resource'
import { Amplify } from 'aws-amplify'
import { env } from '$amplify/env/post-confirmation'
import { createUser } from '../../graphql/mutations'

Amplify.configure(
    {
        API: {
            GraphQL: {
                endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
                region: env.AWS_REGION,
                defaultAuthMode: 'userPool'
            }
        }
    },
    {
        Auth: {
            credentialsProvider: {
                getCredentialsAndIdentityId: async () => ({
                    credentials: {
                        accessKeyId: env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
                        sessionToken: env.AWS_SESSION_TOKEN,
                    },
                }),
                clearCredentialsAndIdentityId: () => {
                    /* noop */
                },
            },
        },
    }
);

const client = generateClient<Schema>()

export const handler: PostConfirmationTriggerHandler = async (event: PostConfirmationTriggerEvent) => {
    const cisp = new CognitoIdentityProvider()
    const { userName, userPoolId, request } = event
    const userAttributes = request.userAttributes
    const orgId = userAttributes['custom:orgId']
    const { email, family_name, given_name } = userAttributes
    const GroupName = `RiderTrackerOrgId#${orgId}`

    const groupParams = {
        GroupName,
        UserPoolId: userPoolId,
    }

    const addUserParams = {
        GroupName,
        UserPoolId: userPoolId,
        Username: userName
    }

    try {
        await cisp.getGroup(groupParams)
    } catch {
        console.log(`${GroupName} does not exist. Creating it now.`)
        await cisp.createGroup(groupParams)
        console.log('Created Group. Adding user to ADMINS Group.')
        await cisp.adminAddUserToGroup({
            GroupName: 'ADMINS',
            UserPoolId: userPoolId,
            Username: userName
        })
    }

    console.log(`Adding user to ${GroupName}.`)
    await cisp.adminAddUserToGroup(addUserParams)

    console.log('Adding user to database.')
    const response = await client.graphql({
        query: createUser,
        variables: {
            input: {
                id: userName,
                firstName: given_name,
                lastName: family_name,
                email,
                orgId
            }
        }
    })

    console.log(JSON.stringify(response))

    return event
}