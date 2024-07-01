import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

export const getTableName = (baseName: string) => {
  const tables = backend.data.resources.cfnResources.cfnTables
  const tableKeys = Object.keys(tables)
  const tableKey = tableKeys.find((tn) => tn.includes(baseName))

  if (tableKey) {
    const tableName = tables[tableKey].tableName

    if (tableName) {
      return tableName
    }
  }

  throw 'Unable to get organiztion table'
}
