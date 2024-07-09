import { Amplify } from 'aws-amplify'
import { env } from '$amplify/env/list-buses-for-org'
import { Schema } from '../../data/resource'
import { generateClient } from 'aws-amplify/data'
import { listBusByOrgId } from '../../graphql/queries'
import { AppSyncResolverHandler } from 'aws-lambda'

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

export const handler: AppSyncResolverHandler<Schema['listBusesForOrg']['args'], Schema['listBusesForOrg']['returnType'], Schema['getUserOrg']> = async (event) => {
    const { identity } = event

    if (!identity) {
        throw 'Missing identity from handler function'
    }

    if ('groups' in identity) {
        const { groups } = identity

        if (groups) {
            const orgGroup = groups.find((g: string) => g.includes('RiderTrackerOrgId#'))

            if (orgGroup) {
                const orgId = orgGroup.split('#')[1]
                const { data } = await client.graphql({
                    query: listBusByOrgId,
                    variables: {
                        orgId
                    }
                })

                const response = data.listBusByOrgId
                const buses = response.items
                return buses
            }
        }
    }

    throw 'Failed to find organization'
}