import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import type { PostConfirmationTriggerHandler, PostConfirmationTriggerEvent } from 'aws-lambda'

export const handler: PostConfirmationTriggerHandler = async (event: PostConfirmationTriggerEvent) => {
    const cisp = new CognitoIdentityProvider()
    const { userName, userPoolId, request } = event
    const userAttributes = request.userAttributes
    const orgId = userAttributes['custom:orgId']
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
        await cisp.createGroup(groupParams)
    }

    await cisp.adminAddUserToGroup(addUserParams)

    return event
}