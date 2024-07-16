import type { AppSyncAuthorizerHandler } from 'aws-lambda'
import { CognitoJwtVerifier } from 'aws-jwt-verify'

interface ResolverContext {
  operationName: string
  orgId: string
}

interface AuthorizerResponse {
  isAuthorized: boolean
  resolverContext: ResolverContext
  deniedFields?: string[]
}

const verifier = CognitoJwtVerifier.create({
  userPoolId: 'us-west-2_OkP47GEUy',
  tokenUse: 'access',
  clientId: '20h7risji8pjbjlk219cl5kfqn',
});

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const {
    authorizationToken,
    requestContext
  } = event

  const payload = await verifier.verify(authorizationToken)
  const qs = requestContext.queryString
  const userGroups = payload['cognito:groups']
  const userOrgId = userGroups?.find((g) => g.includes('RiderTrackerOrgId'))?.split('#')[1]
  const userIsAdmin = userGroups?.includes('ADMINS') ?? false
  const userIsDriver = userGroups?.includes('DRIVERS') ?? false
  const userId = payload.username

  if (!userOrgId) {
    throw 'User missing orgId'
  }

  if (qs.includes('getOrganization')) {
    console.log('getOrganization')
    const requestOrgId = requestContext.variables.id
    return generateGetOrganizationAuth(userOrgId, requestOrgId)
  }

  if (qs.includes('getUser')) {
    console.log('getUser')
    const requestUserId = requestContext.variables.id

    return generateGetUserAuth(userOrgId, requestUserId, userIsAdmin, userIsDriver, userId)
  }

  if (qs.includes('createUser')) {
    console.log('createUser')
    return generateCreateUserAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('getBus')) {
    console.log('getBus')
    const requestBusId = requestContext.variables.id

    return generateGetBusAuth(userOrgId, requestBusId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('listBusByOrgId')) {
    console.log('listBusByOrgId')
    const requestBusId = requestContext.variables.id

    return generateListBusAuth(userOrgId, requestBusId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('createBus')) {
    console.log('createBus')
    return generateCreateBusAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('deleteBus')) {
    console.log('createBus')
    return generateDeleteBusAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  const response = {
    isAuthorized: false,
    resolverContext: {
      operationName: 'Unknown',
      orgId: userOrgId ?? ''
    },
    ttlOverride: 300
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)
  return response
}

const generateGetOrganizationAuth = (orgId: string, requestOrgId: string): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId,
    resolverContext: {
      operationName: 'GetOrganization',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateGetUserAuth = (orgId: string, requestUserId: string, userIsAdmin: boolean, userIsDriver: boolean, userId: string): AuthorizerResponse => {
  const response = {
    isAuthorized: userId === requestUserId || userIsAdmin || userIsDriver,
    resolverContext: {
      operationName: 'GetUser',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateCreateUserAuth = (orgId: string, newUserOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === newUserOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'CreateUser',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateGetBusAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'GetBus',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateListBusAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'ListBuses',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateCreateBusAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'CreateBus',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateDeleteBusAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'CreateBus',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}
