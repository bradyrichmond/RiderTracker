import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { addUserToGroup } from './add-user-to-group/resource'
import { createOrgUser } from './create-org-user/resource'
import { validateAddress } from './validate-address/resource'
import { postConfirmation } from '../auth/post-confirmation/resource'
import { customAuthorizer } from './custom-authorizer/resource'

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
      given_name: a.string().required(),
      orgId: a.string().required()
    })
    .handler(a.handler.function(createOrgUser))
    .returns(a.ref('CreateAdminOutput')),
  validateAddress: a
    .mutation()
    .arguments({ address: a.string().required() })
    .handler(a.handler.function(validateAddress))
    .returns(a.ref('ValidatedAddress')),

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
  Location: a.customType({
    lat: a.string().required(),
    lon: a.string().required()
  }),
  MFAOptionType: a.customType({
    AttributeName: a.string().required(),
    DeliveryMedium: a.ref('DeliveryMediumType')
  }),
  ValidatedAddress: a.customType({
    city: a.string().required(),
    country: a.string().required(),
    county: a.string().required(),
    formatted: a.string().required(),
    houseNumber: a.string().required(),
    lat: a.string().required(),
    lon: a.string().required(),
    postcode: a.string().required(),
    streetName: a.string().required(),
    state: a.string().required()
  }),

  // Enums
  DeliveryMediumType: a.enum(['EMAIL', 'SMS']),
  RouteActionTypes: a.enum(['ROUTE_START', 'ROUTE_END', 'ROUTE_SCAN']),
  OverrideType: a.enum(['OVERRIDE', 'CANCEL', 'NO_CHANGE']),
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
  Organization: a
    .model({
      admins: a.hasMany('Admin', 'orgId'),
      buses: a.hasMany('Bus', 'orgId'),
      drivers: a.hasMany('Driver', 'orgId'),
      guardians: a.hasMany('Guardian', 'orgId'),
      loginImageKey: a.string(),
      orgName: a.string().required(),
      riders: a.hasMany('Rider', 'orgId'),
      schools: a.hasMany('School', 'orgId'),
      routeActions: a.hasMany('RouteAction', 'orgId'),
      routes: a.hasMany('Route', 'orgId'),
      stops: a.hasMany('Stop', 'orgId'),
      users: a.hasMany('User', 'orgId')
    }),
  Address: a
    .model({
      city: a.string().required(),
      country: a.string().required(),
      county: a.string().required(),
      formatted: a.string().required(),
      houseNumber: a.string().required(),
      id: a.id().required(),
      lat: a.string().required(),
      lon: a.string().required(),
      orgId: a.id().required(),
      postcode: a.string().required(),
      school: a.belongsTo('School', 'schoolId'),
      schoolId: a.id(),
      state: a.string().required(),
      streetName: a.string().required(),
      user: a.belongsTo('User', 'userId'),
      userId: a.id()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  Admin: a
    .model({
      org: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
      userId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  Bus: a
    .model({
      busNumber: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  Driver: a
    .model({
      org: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
      userId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')]),
  Guardian: a
    .model({
      id: a.string().required(),
      org: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      riders: a.hasMany('GuardianRider', 'guardianId'),
      user: a.belongsTo('User', 'userId'),
      userId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')]),
  GuardianRider: a
    .model({
      guardian: a.belongsTo('Guardian', 'guardianId'),
      guardianId: a.id().required(),
      rider: a.belongsTo('Rider', 'riderId'),
      riderId: a.id().required()
    }),
  Exception: a
    .model({
      authorized: a.boolean(),
      date: a.date().required(),
      dropoff: a.ref('OverrideType').required(),
      dropoffGuardianId: a.id(),
      dropoffStopId: a.id(),
      id: a.id(),
      orgId: a.id().required(),
      pickup: a.ref('OverrideType').required(),
      pickupGuardianId: a.id(),
      pickupStopId: a.id(),
      riderId: a.id()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  Rider: a
    .model({
      firstName: a.string().required(),
      guardians: a.hasMany('GuardianRider', 'riderId'),
      lastName: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      routeId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  Route: a
    .model({
      isActive: a.boolean(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      riders: a.id().array().required(),
      routeNumber: a.string().required()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  RouteAction: a
    .model({
      actionType: a.ref('RouteActionTypes').required(),
      driverId: a.id().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      riderIds: a.id().array(),
      routeId: a.id().required()
    }),
  Scan: a
    .model({
      deviceLocationOnSubmit: a.ref('Location'),
      guardianIds: a.id().array(),
      manualScan: a.boolean(),
      orgId: a.id().required(),
      riderIds: a.id().array().required(),
      stopId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  School: a
    .model({
      address: a.hasOne('Address', 'schoolId'),
      addressId: a.id().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      riderIds: a.id().array(),
      SchoolHours: a.hasMany('SchoolHour', 'schoolId'),
      schoolName: a.string().required(),
      stopIds: a.id().array(),
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  SchoolHour: a
    .model({
      school: a.belongsTo('School', 'schoolId'),
      schoolId: a.id().required(),
      dayName: a.string().required(),
      endTime: a.time().required(),
      startTime: a.time().required()
    }),
  Stop: a
    .model({
      name: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      riderIds: a.id().array().required(),
      routeId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')])
    .authorization((allow) => allow.custom()),
  User: a
    .model({
      address: a.hasOne('Address', 'userId'),
      admin: a.hasOne('Admin', 'userId'),
      adminId: a.id(),
      driver: a.hasOne('Driver', 'userId'),
      driverId: a.id(),
      guardian: a.hasOne('Guardian', 'userId'),
      guardianId: a.id(),
      email: a.email(),
      firstName: a.string().required(),
      id: a.id().required(),
      lastName: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      stopId: a.id(),
      title: a.string()
    })
    .secondaryIndexes((index) => [index('orgId')])
}).authorization((allow) => [
  allow.custom(),
  allow.resource(addUserToGroup),
  allow.resource(createOrgUser),
  allow.resource(validateAddress),
  allow.resource(postConfirmation)
])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'lambda',
    lambdaAuthorizationMode: {
      function: customAuthorizer
    }
  }
})
