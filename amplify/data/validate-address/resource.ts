import { defineFunction } from '@aws-amplify/backend'
import { secret } from '@aws-amplify/backend'

export const validateAddress = defineFunction({
  name: 'validate-address',
  environment: {
    API_KEY: secret('geoapifyApiKey')
  }
})