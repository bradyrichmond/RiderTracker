import type { AppSyncAuthorizerHandler } from 'aws-lambda'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { env } from '$amplify/env/custom-authorizer'

interface ResolverContext {
  operationName: string
  orgId?: string
}

interface AuthorizerResponse {
  isAuthorized: boolean
  resolverContext: ResolverContext
  deniedFields?: string[]
}

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.USER_POOL_ID,
  tokenUse: 'access',
  clientId: env.WEB_CLIENT_ID
});

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const {
    authorizationToken,
    requestContext
  } = event

  const trimmedAuthorizationToken = authorizationToken.split('#')[1]

  const payload = await verifier.verify(trimmedAuthorizationToken)
  const qs = requestContext.queryString
  const userGroups = payload['cognito:groups']
  const userOrgId = userGroups?.find((g) => g.includes('RiderTrackerOrgId'))?.split('#')[1]
  const userIsAdmin = userGroups?.includes('ADMINS') ?? false
  const userIsDriver = userGroups?.includes('DRIVERS') ?? false
  const userId = payload.username

  if (qs.includes('createOrganization')) {
    return {
      isAuthorized: true,
      resolverContext: {
        operationName: 'createOrganization'
      }
    }
  }

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

  if (qs.includes('createUser') || qs.includes('createOrgUser')) {
    console.log('createUser')
    return generateCreateUserAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('getBus')) {
    console.log('getBus')
    return generateGetBusAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('listBusByOrgId')) {
    console.log('listBusByOrgId')
    return generateListBusAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('createBus')) {
    console.log('createBus')
    return generateCreateBusAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('deleteBus')) {
    console.log('deleteBus')
    return generateDeleteBusAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('getDriver')) {
    console.log('getDriver')
    return generateGetDriverAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('listDriverByOrgId')) {
    console.log('listDriverByOrgId')
    return generateListDriverAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('createDriver')) {
    console.log('createDriver')
    return generateCreateDriverAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('deleteDriver')) {
    console.log('deleteDriver')
    return generateDeleteDriverAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('getGuardian')) {
    console.log('getGuardian')
    return generateGetGuardianAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('listGuardianByOrgId')) {
    console.log('listGuardianByOrgId')
    return generateListGuardianAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('createGuardian')) {
    console.log('createGuardian')
    return generateCreateGuardianAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('deleteGuardian')) {
    console.log('deleteGuardian')
    return generateDeleteGuardianAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('getRider')) {
    console.log('getRider')
    return generateGetRiderAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('listRiderByOrgId')) {
    console.log('listRiderByOrgId')
    return generateListRiderAuth(userOrgId, requestContext.variables.orgId, userIsAdmin, userIsDriver)
  }

  if (qs.includes('createRider')) {
    console.log('createRider')
    return generateCreateRiderAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('deleteRider')) {
    console.log('deleteRider')
    return generateDeleteRiderAuth(userOrgId, requestContext.variables.orgId, userIsAdmin)
  }

  if (qs.includes('validateAddress')) {
    console.log('validateAddress')
    return {
      isAuthorized: true,
      resolverContext: {
        operationName: 'ValidateAddress',
        orgId: userOrgId
      }
    }
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
      orgId,
      requestOrgId,
      userIsAdmin,
      userIsDriver
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
      operationName: 'DeleteBus',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateGetDriverAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'GetDriver',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateListDriverAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'ListDrivers',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateCreateDriverAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'CreateDriver',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateDeleteDriverAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'DeleteDriver',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateGetGuardianAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'GetGuardian',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateListGuardianAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'ListGuardians',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateCreateGuardianAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'CreateGuardian',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateDeleteGuardianAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'DeleteGuardian',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateGetRiderAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  // need to add guardians that have auth to get their own riders
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'GetRider',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateListRiderAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean, userIsDriver: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && (userIsAdmin || userIsDriver),
    resolverContext: {
      operationName: 'ListRiders',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateCreateRiderAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'CreateRider',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}

const generateDeleteRiderAuth = (orgId: string, requestOrgId: string, userIsAdmin: boolean): AuthorizerResponse => {
  const response = {
    isAuthorized: orgId === requestOrgId && userIsAdmin,
    resolverContext: {
      operationName: 'DeleteRider',
      orgId
    }
  }

  console.log(`RESPONSE: ${JSON.stringify(response)}`)

  return response
}
