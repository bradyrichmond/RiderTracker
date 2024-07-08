import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { addUserToGroup } from './add-user-to-group/resource'
import { createOrgUser } from './create-org-user/resource'
import { validateAddress } from './validate-address/resource'
import { getOrg } from '../functions/get-org/resource'
import { getCurrentUser } from '../functions/get-current-user/resource'
// import { listAdminsForOrg } from '../functions/list-admins-for-org/resource'
// import { listBusesForOrg } from '../functions/list-buses-for-org/resource'
// import { listDriversForOrg } from '../functions/list-drivers-for-org/resource'
// import { listGuardiansForOrg } from '../functions/list-guardians-for-org/resource'
// import { listRidersForOrg } from '../functions/list-riders-for-org/resource'
// import { listRoutesForOrg } from '../functions/list-routes-for-org/resource'
// import { listScansForOrg } from '../functions/list-scans-for-org/resource'
// import { listSchoolsForOrg } from '../functions/list-schools-for-org/resource'

const schema = a.schema({
  // Queries
  getCurrentUser: a
    .query()
    .returns(a.ref('User').required())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(getCurrentUser)),
  getUserOrg: a
    .query()
    .returns(a.ref('Organization'))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(getOrg)),
  // listAdminsForOrg: a
  //   .query()
  //   .returns(a.ref('User').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listAdminsForOrg)),
  // listBusesForOrg: a
  //   .query()
  //   .returns(a.ref('Bus').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listBusesForOrg)),
  // listDriversForOrg: a
  //   .query()
  //   .returns(a.ref('User').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listDriversForOrg)),
  // listGuardiansForOrg: a
  //   .query()
  //   .returns(a.ref('User').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listGuardiansForOrg)),
  // listRidersForOrg: a
  //   .query()
  //   .returns(a.ref('Rider').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listRidersForOrg)),
  // listRoutesForOrg: a
  //   .query()
  //   .returns(a.ref('Route').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listRoutesForOrg)),
  // listScansForOrg: a
  //   .query()
  //   .returns(a.ref('Scan').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listScansForOrg)),
  // listSchoolsForOrg: a
  //   .query()
  //   .returns(a.ref('School').array().required())
  //   .authorization((allow) => [allow.group('ADMINS')])
  //   .handler(a.handler.function(listSchoolsForOrg)),

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
      loginImageKey: a.string(),
      orgName: a.string().required(),
      riders: a.hasMany('Rider', 'orgId'),
      schools: a.hasMany('School', 'orgId'),
      routeActions: a.hasMany('RouteAction', 'orgId'),
      routes: a.hasMany('Route', 'orgId'),
      stops: a.hasMany('Stop', 'orgId'),
      users: a.hasMany('User', 'orgId')
    })
    .authorization((allow) => [allow.guest().to(['create'])]),
  Address: a
    .model({
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
  Admin: a
    .model({
      org: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      user: a.belongsTo('User', ['orgId', 'userId']),
      userId: a.id().required()
    }),
  Bus: a
    .model({
      busNumber: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required()
    })
    .secondaryIndexes((index) => [index('orgId')]),
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
    }),
  Rider: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      routeId: a.id().required()
    }),
  Route: a
    .model({
      isActive: a.boolean(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      riders: a.id().array().required(),
      routeNumber: a.string().required()
    }),
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
    }),
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
    }),
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
    }),
  User: a
    .model({
      admin: a.hasOne('Admin', ['orgId', 'userId']),
      adminId: a.id(),
      email: a.email(),
      firstName: a.string().required(),
      id: a.id().required(),
      lastName: a.string().required(),
      organization: a.belongsTo('Organization', 'orgId'),
      orgId: a.id().required(),
      stopId: a.id(),
      title: a.string()
    })
    .identifier(['orgId', 'id'])
}).authorization((allow) => [
  allow.authenticated(),
  allow.resource(getCurrentUser),
  allow.resource(getOrg),
  // allow.resource(listAdminsForOrg),
  // allow.resource(listBusesForOrg),
  // allow.resource(listDriversForOrg),
  // allow.resource(listGuardiansForOrg),
  // allow.resource(listRidersForOrg),
  // allow.resource(listRoutesForOrg),
  // allow.resource(listScansForOrg),
  // allow.resource(listSchoolsForOrg)
])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
})
