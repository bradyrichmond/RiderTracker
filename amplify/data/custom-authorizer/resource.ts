import { defineFunction } from '@aws-amplify/backend'
import * as settings from '../../../amplify_outputs.json'

export const customAuthorizer = defineFunction({
  name: 'custom-authorizer',
  environment: {
    USER_POOL_ID: settings.auth.user_pool_id,
    WEB_CLIENT_ID: settings.auth.user_pool_client_id
  }
})