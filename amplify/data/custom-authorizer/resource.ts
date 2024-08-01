import { defineFunction } from '@aws-amplify/backend'
import * as initialSettings from '../../../amplify_outputs.json'

const settings: {
  version: string
  auth?: {
    user_pool_id: string
    user_pool_client_id: string
  }
} = initialSettings

export const customAuthorizer = defineFunction({
  name: 'custom-authorizer',
  environment: {
    USER_POOL_ID: settings.auth?.user_pool_id ?? '',
    WEB_CLIENT_ID: settings.auth?.user_pool_client_id ?? ''
  }
})