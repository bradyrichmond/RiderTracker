import { Amplify } from 'aws-amplify'
import { env } from '$amplify/env/get-org'
import { Schema } from '../../data/resource'
import { generateClient } from 'aws-amplify/data'
import { AppSyncResolverHandler } from 'aws-lambda'
import { createBus } from '../../graphql/mutations'

Amplify.configure(
    {
        API: {
            GraphQL: {
                endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
                region: env.AWS_REGION,
                defaultAuthMode: 'identityPool'
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler: AppSyncResolverHandler<Schema['createBusForOrg']['args'], Schema['createBusForOrg']['returnType'], Schema['getUserOrg']> = async (event) => {
    const { identity, arguments: args } = event
    const { busNumber } = args

    if (!identity) {
        throw 'Missing identity from handler function'
    }

    if ('groups' in identity) {
        const { groups } = identity

        if (groups) {
            if (!groups.includes('ADMINS')) {
                throw 'User is not Admin'
            }

            const orgGroup = groups.find((g: string) => g.includes('RiderTrackerOrgId#'))

            if (!orgGroup) {
                throw 'Org group not found for user'
            }

            const orgId = orgGroup.split('#')[1]
            await client.graphql({
                query: createBus,
                variables: {
                    input: {
                        busNumber,
                        orgId
                    }
                }
            })

        }
    }

    throw 'Failed to create bus'
}