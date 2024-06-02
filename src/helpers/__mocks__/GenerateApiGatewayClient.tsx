import apigClientFactory from '../../../apigClient'
import { ApiGatewayClientType } from '../GenerateApiGatewayClient'

export const generateApiGatewayClient = async(): Promise<ApiGatewayClientType> => {
        const credentials = {
            accessKeyId: 'mockAccessKey',
            secretAccessKey: 'mockSecretKey',
            sessionToken: 'mockSessionToken',
            region: 'us-west-2'
        }

        const apigClient = apigClientFactory.newClient(credentials)

        return apigClient
}