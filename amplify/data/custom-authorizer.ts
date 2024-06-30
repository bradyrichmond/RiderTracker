import type { AppSyncAuthorizerHandler } from 'aws-lambda'
import { jwtDecode, JwtPayload } from 'jwt-decode'

type ResolverContext = {
  userId?: string
}

interface AWSJWTPayload extends JwtPayload {
    'cognito:groups': string[]
}

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const token = event.authorizationToken

  const decoded: AWSJWTPayload = jwtDecode(token)
  const userId = decoded.sub

  const response = {
    isAuthorized: true,
    resolverContext: {
      userId,
      eventString: JSON.stringify(event)
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response, null, 2)}`)

  return response
}