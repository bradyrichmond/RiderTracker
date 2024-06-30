import { defineAuth } from '@aws-amplify/backend'
import { addUserToGroup } from '../data/add-user-to-group/resource'
import { createOrgUser } from '../data/create-org-user/resource'

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ['ADMINS', 'GUARDIANS', 'DRIVERS'],
  access: (allow) => [
    allow.resource(addUserToGroup).to(['addUserToGroup']),
    allow.resource(createOrgUser).to(['createUser'])
  ]
})
