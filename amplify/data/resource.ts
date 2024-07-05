import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { addUserToGroup } from './add-user-to-group/resource'
import { createOrgUser } from './create-org-user/resource'
import { validateAddress } from './validate-address/resource'

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
  DeliveryMediumType: a.enum([ 'EMAIL', 'SMS' ]),
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
  Organization: a.model({
    orgName: a.string().required(),
    loginImageKey: a.string(),
    users: a.hasMany('User', 'orgId'),
    admins: a.string().array(),
    guardians: a.string().array(),
    drivers: a.string().array(),
    riders: a.hasMany('Rider', 'orgId'),
    buses: a.hasMany('Bus', 'orgId'),
    schools: a.hasMany('School', 'orgId'),
    routes: a.hasMany('Route', 'orgId'),
    stops: a.hasMany('Stop', 'orgId'),
    routeActions: a.hasMany('RouteAction', 'orgId')
  })
  .authorization((allow) => [
    allow.authenticated(),
    allow.guest().to(['create'])
  ]),
  Address: a.model({
    city: a.string().required(),
    country: a.string().required(),
    county: a.string().required(),
    formatted: a.string().required(),
    houseNumber: a.string().required(),
    lat: a.string().required(),
    lon: a.string().required(),
    orgId: a.id().required(),
    postcode: a.string().required(),
    school: a.belongsTo('School', 'schoolId'),
    schoolId: a.id(),
    state: a.string().required(),
    streetName: a.string().required()
  })
  .secondaryIndexes((index) => [index('orgId')]),
  Bus: a.model({
    busNumber: a.string().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required()
  })
  .secondaryIndexes((index) => [index('orgId')]),
  Exception: a.model({
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
  }),
  Rider: a.model({
    firstName: a.string().required(),
    lastName: a.string().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    routeId: a.id().required()
  }),
  Route: a.model({
    isActive: a.boolean(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    riders: a.id().array().required(),
    routeNumber: a.string().required()
  }),
  RouteAction: a.model({
    actionType: a.ref('RouteActionTypes').required(),
    driverId: a.id().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    riderIds: a.id().array(),
    routeId: a.id().required()
  }),
  Scan: a.model({
    deviceLocationOnSubmit: a.ref('Location'),
    guardianIds: a.id().array(),
    manualScan: a.boolean(),
    orgId: a.id().required(),
    riderIds: a.id().array().required(),
    stopId: a.id().required()
  }),
  School: a.model({
    address: a.hasOne('Address', 'schoolId'),
    addressId: a.id().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    riderIds: a.id().array(),
    SchoolHours: a.hasMany('SchoolHour', 'schoolId'),
    schoolName: a.string().required(),
    stopIds: a.id().array(),
  }),
  SchoolHour: a.model({
    school: a.belongsTo('School', 'schoolId'),
    schoolId: a.id().required(),
    dayName: a.string().required(),
    endTime: a.time().required(),
    startTime: a.time().required()
  }),
  Stop: a.model({
    name: a.string().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    riderIds: a.id().array().required(),
    routeId: a.id().required()
  }),
  User: a.model({
    email: a.email(),
    firstName: a.string().required(),
    id: a.id().required(),
    lastName: a.string().required(),
    organization: a.belongsTo('Organization', 'orgId'),
    orgId: a.id().required(),
    stopId: a.id(),
    title: a.string()
  })
}).authorization((allow) => [allow.authenticated()])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
})

