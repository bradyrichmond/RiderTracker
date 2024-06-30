import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { addUserToGroup } from './add-user-to-group/resource'
import { createOrgUser } from './create-org-user/resource';

const schema = a.schema({
  // Mutations
  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),
  createOrgUser: a
    .mutation()
    .arguments({
      email: a.string().required(),
      family_name: a.string().required(),
      given_name: a.string().required()
    })
    .handler(a.handler.function(createOrgUser))
    .returns(a.ref('CreateAdminOutput')),

  // CustomTypes
  AttributeType: a.customType({
    Name: a.string().required(),
    Value: a.string().required()
  }),
  CreateAdminOutput: a.customType({
    User: a.customType({
      Attributes: a.ref('AttributeType').array(),
      Enabled: a.boolean().required(),
      MFAOptions: a.ref('MFAOptionType').array(),
      UserCreateDate: a.date().required(),
      UserLastModifiedDate: a.date().required(),
      UserStatus: a.ref('UserStatusType'),
      Username: a.string().required()
    })
  }),
  DeliveryMediumType: a.enum([ 'EMAIL', 'SMS' ]),
  MFAOptionType: a.customType({
    AttributeName: a.string().required(),
    DeliveryMedium: a.ref('DeliveryMediumType')
  }),
  UserStatusType: a.enum([
    'ARCHIVED',
    'COMPROMISED',
    'CONFIRMED',
    'EXTERNAL_PROVIDER',
    'FORCE_CHANGE_PASSWORD',
    'RESET_REQUIRED',
    'UNCONFIRMED',
    'UNKNOWN'
  ]),

  // Models
  Organization: a.model({
    orgName: a.string().required(),
    loginImageKey: a.string(),
    users: a.hasMany('User', 'orgId'),
    admins: a.string().array(),
    guardians: a.string().array(),
    drivers: a.string().array()
  }),
  User: a.model({
    email: a.email(),
    firstName: a.string().required(),
    id: a.id().required(),
    lastName: a.string().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    title: a.string()
  })
}).authorization((allow) => [allow.authenticated(), allow.guest()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
})

/*
'use client'
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/* == STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
========================================================================= */

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
