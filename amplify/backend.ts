import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
});

const { cfnUserPool } = backend.auth.resources.cfnResources

if (Array.isArray(cfnUserPool.schema)) {
  cfnUserPool.schema.push({
    name: 'orgId',
    attributeDataType: 'String'
  })
}
