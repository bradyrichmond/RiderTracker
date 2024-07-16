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

    return event
}