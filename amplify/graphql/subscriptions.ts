/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAddress = /* GraphQL */ `subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
  onCreateAddress(filter: $filter) {
    city
    country
    county
    createdAt
    formatted
    houseNumber
    id
    lat
    lon
    orgId
    postcode
    school {
      addressId
      createdAt
      id
      orgId
      riderIds
      schoolName
      stopIds
      updatedAt
      __typename
    }
    schoolId
    state
    streetName
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAddressSubscriptionVariables,
  APITypes.OnCreateAddressSubscription
>;
export const onCreateAdmin = /* GraphQL */ `subscription OnCreateAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onCreateAdmin(filter: $filter) {
    createdAt
    id
    org {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    orgId
    updatedAt
    user {
      adminId
      createdAt
      email
      firstName
      id
      lastName
      orgId
      stopId
      title
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAdminSubscriptionVariables,
  APITypes.OnCreateAdminSubscription
>;
export const onCreateBus = /* GraphQL */ `subscription OnCreateBus($filter: ModelSubscriptionBusFilterInput) {
  onCreateBus(filter: $filter) {
    busNumber
    createdAt
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateBusSubscriptionVariables,
  APITypes.OnCreateBusSubscription
>;
export const onCreateException = /* GraphQL */ `subscription OnCreateException($filter: ModelSubscriptionExceptionFilterInput) {
  onCreateException(filter: $filter) {
    authorized
    createdAt
    date
    dropoff
    dropoffGuardianId
    dropoffStopId
    id
    orgId
    pickup
    pickupGuardianId
    pickupStopId
    riderId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExceptionSubscriptionVariables,
  APITypes.OnCreateExceptionSubscription
>;
export const onCreateOrganization = /* GraphQL */ `subscription OnCreateOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onCreateOrganization(filter: $filter) {
    admins {
      nextToken
      __typename
    }
    buses {
      nextToken
      __typename
    }
    createdAt
    id
    loginImageKey
    orgName
    riders {
      nextToken
      __typename
    }
    routeActions {
      nextToken
      __typename
    }
    routes {
      nextToken
      __typename
    }
    schools {
      nextToken
      __typename
    }
    stops {
      nextToken
      __typename
    }
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateOrganizationSubscriptionVariables,
  APITypes.OnCreateOrganizationSubscription
>;
export const onCreateRider = /* GraphQL */ `subscription OnCreateRider($filter: ModelSubscriptionRiderFilterInput) {
  onCreateRider(filter: $filter) {
    createdAt
    firstName
    id
    lastName
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRiderSubscriptionVariables,
  APITypes.OnCreateRiderSubscription
>;
export const onCreateRoute = /* GraphQL */ `subscription OnCreateRoute($filter: ModelSubscriptionRouteFilterInput) {
  onCreateRoute(filter: $filter) {
    createdAt
    id
    isActive
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riders
    routeNumber
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRouteSubscriptionVariables,
  APITypes.OnCreateRouteSubscription
>;
export const onCreateRouteAction = /* GraphQL */ `subscription OnCreateRouteAction(
  $filter: ModelSubscriptionRouteActionFilterInput
) {
  onCreateRouteAction(filter: $filter) {
    actionType
    createdAt
    driverId
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRouteActionSubscriptionVariables,
  APITypes.OnCreateRouteActionSubscription
>;
export const onCreateScan = /* GraphQL */ `subscription OnCreateScan($filter: ModelSubscriptionScanFilterInput) {
  onCreateScan(filter: $filter) {
    createdAt
    deviceLocationOnSubmit {
      lat
      lon
      __typename
    }
    guardianIds
    id
    manualScan
    orgId
    riderIds
    stopId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateScanSubscriptionVariables,
  APITypes.OnCreateScanSubscription
>;
export const onCreateSchool = /* GraphQL */ `subscription OnCreateSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onCreateSchool(filter: $filter) {
    SchoolHours {
      nextToken
      __typename
    }
    address {
      city
      country
      county
      createdAt
      formatted
      houseNumber
      id
      lat
      lon
      orgId
      postcode
      schoolId
      state
      streetName
      updatedAt
      __typename
    }
    addressId
    createdAt
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    schoolName
    stopIds
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSchoolSubscriptionVariables,
  APITypes.OnCreateSchoolSubscription
>;
export const onCreateSchoolHour = /* GraphQL */ `subscription OnCreateSchoolHour(
  $filter: ModelSubscriptionSchoolHourFilterInput
) {
  onCreateSchoolHour(filter: $filter) {
    createdAt
    dayName
    endTime
    id
    school {
      addressId
      createdAt
      id
      orgId
      riderIds
      schoolName
      stopIds
      updatedAt
      __typename
    }
    schoolId
    startTime
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSchoolHourSubscriptionVariables,
  APITypes.OnCreateSchoolHourSubscription
>;
export const onCreateStop = /* GraphQL */ `subscription OnCreateStop($filter: ModelSubscriptionStopFilterInput) {
  onCreateStop(filter: $filter) {
    createdAt
    id
    name
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateStopSubscriptionVariables,
  APITypes.OnCreateStopSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    admin {
      createdAt
      id
      orgId
      updatedAt
      userId
      __typename
    }
    adminId
    createdAt
    email
    firstName
    id
    lastName
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    stopId
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteAddress = /* GraphQL */ `subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
  onDeleteAddress(filter: $filter) {
    city
    country
    county
    createdAt
    formatted
    houseNumber
    id
    lat
    lon
    orgId
    postcode
    school {
      addressId
      createdAt
      id
      orgId
      riderIds
      schoolName
      stopIds
      updatedAt
      __typename
    }
    schoolId
    state
    streetName
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAddressSubscriptionVariables,
  APITypes.OnDeleteAddressSubscription
>;
export const onDeleteAdmin = /* GraphQL */ `subscription OnDeleteAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onDeleteAdmin(filter: $filter) {
    createdAt
    id
    org {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    orgId
    updatedAt
    user {
      adminId
      createdAt
      email
      firstName
      id
      lastName
      orgId
      stopId
      title
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteAdminSubscriptionVariables,
  APITypes.OnDeleteAdminSubscription
>;
export const onDeleteBus = /* GraphQL */ `subscription OnDeleteBus($filter: ModelSubscriptionBusFilterInput) {
  onDeleteBus(filter: $filter) {
    busNumber
    createdAt
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteBusSubscriptionVariables,
  APITypes.OnDeleteBusSubscription
>;
export const onDeleteException = /* GraphQL */ `subscription OnDeleteException($filter: ModelSubscriptionExceptionFilterInput) {
  onDeleteException(filter: $filter) {
    authorized
    createdAt
    date
    dropoff
    dropoffGuardianId
    dropoffStopId
    id
    orgId
    pickup
    pickupGuardianId
    pickupStopId
    riderId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExceptionSubscriptionVariables,
  APITypes.OnDeleteExceptionSubscription
>;
export const onDeleteOrganization = /* GraphQL */ `subscription OnDeleteOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onDeleteOrganization(filter: $filter) {
    admins {
      nextToken
      __typename
    }
    buses {
      nextToken
      __typename
    }
    createdAt
    id
    loginImageKey
    orgName
    riders {
      nextToken
      __typename
    }
    routeActions {
      nextToken
      __typename
    }
    routes {
      nextToken
      __typename
    }
    schools {
      nextToken
      __typename
    }
    stops {
      nextToken
      __typename
    }
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteOrganizationSubscriptionVariables,
  APITypes.OnDeleteOrganizationSubscription
>;
export const onDeleteRider = /* GraphQL */ `subscription OnDeleteRider($filter: ModelSubscriptionRiderFilterInput) {
  onDeleteRider(filter: $filter) {
    createdAt
    firstName
    id
    lastName
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRiderSubscriptionVariables,
  APITypes.OnDeleteRiderSubscription
>;
export const onDeleteRoute = /* GraphQL */ `subscription OnDeleteRoute($filter: ModelSubscriptionRouteFilterInput) {
  onDeleteRoute(filter: $filter) {
    createdAt
    id
    isActive
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riders
    routeNumber
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRouteSubscriptionVariables,
  APITypes.OnDeleteRouteSubscription
>;
export const onDeleteRouteAction = /* GraphQL */ `subscription OnDeleteRouteAction(
  $filter: ModelSubscriptionRouteActionFilterInput
) {
  onDeleteRouteAction(filter: $filter) {
    actionType
    createdAt
    driverId
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRouteActionSubscriptionVariables,
  APITypes.OnDeleteRouteActionSubscription
>;
export const onDeleteScan = /* GraphQL */ `subscription OnDeleteScan($filter: ModelSubscriptionScanFilterInput) {
  onDeleteScan(filter: $filter) {
    createdAt
    deviceLocationOnSubmit {
      lat
      lon
      __typename
    }
    guardianIds
    id
    manualScan
    orgId
    riderIds
    stopId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteScanSubscriptionVariables,
  APITypes.OnDeleteScanSubscription
>;
export const onDeleteSchool = /* GraphQL */ `subscription OnDeleteSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onDeleteSchool(filter: $filter) {
    SchoolHours {
      nextToken
      __typename
    }
    address {
      city
      country
      county
      createdAt
      formatted
      houseNumber
      id
      lat
      lon
      orgId
      postcode
      schoolId
      state
      streetName
      updatedAt
      __typename
    }
    addressId
    createdAt
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    schoolName
    stopIds
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSchoolSubscriptionVariables,
  APITypes.OnDeleteSchoolSubscription
>;
export const onDeleteSchoolHour = /* GraphQL */ `subscription OnDeleteSchoolHour(
  $filter: ModelSubscriptionSchoolHourFilterInput
) {
  onDeleteSchoolHour(filter: $filter) {
    createdAt
    dayName
    endTime
    id
    school {
      addressId
      createdAt
      id
      orgId
      riderIds
      schoolName
      stopIds
      updatedAt
      __typename
    }
    schoolId
    startTime
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSchoolHourSubscriptionVariables,
  APITypes.OnDeleteSchoolHourSubscription
>;
export const onDeleteStop = /* GraphQL */ `subscription OnDeleteStop($filter: ModelSubscriptionStopFilterInput) {
  onDeleteStop(filter: $filter) {
    createdAt
    id
    name
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteStopSubscriptionVariables,
  APITypes.OnDeleteStopSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    admin {
      createdAt
      id
      orgId
      updatedAt
      userId
      __typename
    }
    adminId
    createdAt
    email
    firstName
    id
    lastName
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    stopId
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateAddress = /* GraphQL */ `subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
  onUpdateAddress(filter: $filter) {
    city
    country
    county
    createdAt
    formatted
    houseNumber
    id
    lat
    lon
    orgId
    postcode
    school {
      addressId
      createdAt
      id
      orgId
      riderIds
      schoolName
      stopIds
      updatedAt
      __typename
    }
    schoolId
    state
    streetName
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAddressSubscriptionVariables,
  APITypes.OnUpdateAddressSubscription
>;
export const onUpdateAdmin = /* GraphQL */ `subscription OnUpdateAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onUpdateAdmin(filter: $filter) {
    createdAt
    id
    org {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    orgId
    updatedAt
    user {
      adminId
      createdAt
      email
      firstName
      id
      lastName
      orgId
      stopId
      title
      updatedAt
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateAdminSubscriptionVariables,
  APITypes.OnUpdateAdminSubscription
>;
export const onUpdateBus = /* GraphQL */ `subscription OnUpdateBus($filter: ModelSubscriptionBusFilterInput) {
  onUpdateBus(filter: $filter) {
    busNumber
    createdAt
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateBusSubscriptionVariables,
  APITypes.OnUpdateBusSubscription
>;
export const onUpdateException = /* GraphQL */ `subscription OnUpdateException($filter: ModelSubscriptionExceptionFilterInput) {
  onUpdateException(filter: $filter) {
    authorized
    createdAt
    date
    dropoff
    dropoffGuardianId
    dropoffStopId
    id
    orgId
    pickup
    pickupGuardianId
    pickupStopId
    riderId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateExceptionSubscriptionVariables,
  APITypes.OnUpdateExceptionSubscription
>;
export const onUpdateOrganization = /* GraphQL */ `subscription OnUpdateOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onUpdateOrganization(filter: $filter) {
    admins {
      nextToken
      __typename
    }
    buses {
      nextToken
      __typename
    }
    createdAt
    id
    loginImageKey
    orgName
    riders {
      nextToken
      __typename
    }
    routeActions {
      nextToken
      __typename
    }
    routes {
      nextToken
      __typename
    }
    schools {
      nextToken
      __typename
    }
    stops {
      nextToken
      __typename
    }
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateOrganizationSubscriptionVariables,
  APITypes.OnUpdateOrganizationSubscription
>;
export const onUpdateRider = /* GraphQL */ `subscription OnUpdateRider($filter: ModelSubscriptionRiderFilterInput) {
  onUpdateRider(filter: $filter) {
    createdAt
    firstName
    id
    lastName
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRiderSubscriptionVariables,
  APITypes.OnUpdateRiderSubscription
>;
export const onUpdateRoute = /* GraphQL */ `subscription OnUpdateRoute($filter: ModelSubscriptionRouteFilterInput) {
  onUpdateRoute(filter: $filter) {
    createdAt
    id
    isActive
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riders
    routeNumber
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRouteSubscriptionVariables,
  APITypes.OnUpdateRouteSubscription
>;
export const onUpdateRouteAction = /* GraphQL */ `subscription OnUpdateRouteAction(
  $filter: ModelSubscriptionRouteActionFilterInput
) {
  onUpdateRouteAction(filter: $filter) {
    actionType
    createdAt
    driverId
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRouteActionSubscriptionVariables,
  APITypes.OnUpdateRouteActionSubscription
>;
export const onUpdateScan = /* GraphQL */ `subscription OnUpdateScan($filter: ModelSubscriptionScanFilterInput) {
  onUpdateScan(filter: $filter) {
    createdAt
    deviceLocationOnSubmit {
      lat
      lon
      __typename
    }
    guardianIds
    id
    manualScan
    orgId
    riderIds
    stopId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateScanSubscriptionVariables,
  APITypes.OnUpdateScanSubscription
>;
export const onUpdateSchool = /* GraphQL */ `subscription OnUpdateSchool($filter: ModelSubscriptionSchoolFilterInput) {
  onUpdateSchool(filter: $filter) {
    SchoolHours {
      nextToken
      __typename
    }
    address {
      city
      country
      county
      createdAt
      formatted
      houseNumber
      id
      lat
      lon
      orgId
      postcode
      schoolId
      state
      streetName
      updatedAt
      __typename
    }
    addressId
    createdAt
    id
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    schoolName
    stopIds
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSchoolSubscriptionVariables,
  APITypes.OnUpdateSchoolSubscription
>;
export const onUpdateSchoolHour = /* GraphQL */ `subscription OnUpdateSchoolHour(
  $filter: ModelSubscriptionSchoolHourFilterInput
) {
  onUpdateSchoolHour(filter: $filter) {
    createdAt
    dayName
    endTime
    id
    school {
      addressId
      createdAt
      id
      orgId
      riderIds
      schoolName
      stopIds
      updatedAt
      __typename
    }
    schoolId
    startTime
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSchoolHourSubscriptionVariables,
  APITypes.OnUpdateSchoolHourSubscription
>;
export const onUpdateStop = /* GraphQL */ `subscription OnUpdateStop($filter: ModelSubscriptionStopFilterInput) {
  onUpdateStop(filter: $filter) {
    createdAt
    id
    name
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    riderIds
    routeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateStopSubscriptionVariables,
  APITypes.OnUpdateStopSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    admin {
      createdAt
      id
      orgId
      updatedAt
      userId
      __typename
    }
    adminId
    createdAt
    email
    firstName
    id
    lastName
    orgId
    organization {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    stopId
    title
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
