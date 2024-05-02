import { fetchAuthSession } from "@aws-amplify/auth"

export type ApiGatewayClientType = ReturnType<typeof apigClientFactory.newClient>

export const generateApiGatewayClient = async(): Promise<ApiGatewayClientType> => {
    try {
        const session = await fetchAuthSession()

        const { credentials } = session
        if (credentials) {
            const { accessKeyId: accessKey, secretAccessKey: secretKey, sessionToken } = credentials
            const apigClient = apigClientFactory.newClient({ accessKey, secretKey, sessionToken, region: 'us-west-2' })
            return apigClient
        }

        throw ''
    } catch {
        throw 'Error creating apigateway client instance'
    }
}
