import type { AppSyncAuthorizerHandler } from 'aws-lambda'

interface ResolverContext {
  isAuthorized: boolean
}

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const response = {
    isAuthorized: true,
    resolverContext: {
      isAuthorized: true
    },
    ttlOverride: 300
  }

  console.log(`RESPONSE: ${JSON.stringify(response, null, 2)}`)
  return response
}