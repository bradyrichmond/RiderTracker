/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAddress = /* GraphQL */ `query GetAddress($id: ID!) {
  getAddress(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAddressQueryVariables,
  APITypes.GetAddressQuery
>;
export const getAdmin = /* GraphQL */ `query GetAdmin($id: ID!) {
  getAdmin(id: $id) {
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
` as GeneratedQuery<APITypes.GetAdminQueryVariables, APITypes.GetAdminQuery>;
export const getBus = /* GraphQL */ `query GetBus($id: ID!) {
  getBus(id: $id) {
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
` as GeneratedQuery<APITypes.GetBusQueryVariables, APITypes.GetBusQuery>;
export const getCurrentUser = /* GraphQL */ `query GetCurrentUser {
  getCurrentUser {
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
` as GeneratedQuery<
  APITypes.GetCurrentUserQueryVariables,
  APITypes.GetCurrentUserQuery
>;
export const getException = /* GraphQL */ `query GetException($id: ID!) {
  getException(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetExceptionQueryVariables,
  APITypes.GetExceptionQuery
>;
export const getOrganization = /* GraphQL */ `query GetOrganization($id: ID!) {
  getOrganization(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetOrganizationQueryVariables,
  APITypes.GetOrganizationQuery
>;
export const getRider = /* GraphQL */ `query GetRider($id: ID!) {
  getRider(id: $id) {
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
` as GeneratedQuery<APITypes.GetRiderQueryVariables, APITypes.GetRiderQuery>;
export const getRoute = /* GraphQL */ `query GetRoute($id: ID!) {
  getRoute(id: $id) {
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
` as GeneratedQuery<APITypes.GetRouteQueryVariables, APITypes.GetRouteQuery>;
export const getRouteAction = /* GraphQL */ `query GetRouteAction($id: ID!) {
  getRouteAction(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetRouteActionQueryVariables,
  APITypes.GetRouteActionQuery
>;
export const getScan = /* GraphQL */ `query GetScan($id: ID!) {
  getScan(id: $id) {
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
` as GeneratedQuery<APITypes.GetScanQueryVariables, APITypes.GetScanQuery>;
export const getSchool = /* GraphQL */ `query GetSchool($id: ID!) {
  getSchool(id: $id) {
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
` as GeneratedQuery<APITypes.GetSchoolQueryVariables, APITypes.GetSchoolQuery>;
export const getSchoolHour = /* GraphQL */ `query GetSchoolHour($id: ID!) {
  getSchoolHour(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSchoolHourQueryVariables,
  APITypes.GetSchoolHourQuery
>;
export const getStop = /* GraphQL */ `query GetStop($id: ID!) {
  getStop(id: $id) {
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
` as GeneratedQuery<APITypes.GetStopQueryVariables, APITypes.GetStopQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const getUserOrg = /* GraphQL */ `query GetUserOrg {
  getUserOrg {
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
` as GeneratedQuery<
  APITypes.GetUserOrgQueryVariables,
  APITypes.GetUserOrgQuery
>;
export const listAddressByOrgId = /* GraphQL */ `query ListAddressByOrgId(
  $filter: ModelAddressFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listAddressByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAddressByOrgIdQueryVariables,
  APITypes.ListAddressByOrgIdQuery
>;
export const listAddresses = /* GraphQL */ `query ListAddresses(
  $filter: ModelAddressFilterInput
  $limit: Int
  $nextToken: String
) {
  listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAddressesQueryVariables,
  APITypes.ListAddressesQuery
>;
export const listAdminByOrgId = /* GraphQL */ `query ListAdminByOrgId(
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listAdminByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      orgId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminByOrgIdQueryVariables,
  APITypes.ListAdminByOrgIdQuery
>;
export const listAdmins = /* GraphQL */ `query ListAdmins(
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      orgId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminsQueryVariables,
  APITypes.ListAdminsQuery
>;
export const listBusByOrgId = /* GraphQL */ `query ListBusByOrgId(
  $filter: ModelBusFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listBusByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
      busNumber
      createdAt
      id
      orgId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBusByOrgIdQueryVariables,
  APITypes.ListBusByOrgIdQuery
>;
export const listBuses = /* GraphQL */ `query ListBuses($filter: ModelBusFilterInput, $limit: Int, $nextToken: String) {
  listBuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      busNumber
      createdAt
      id
      orgId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListBusesQueryVariables, APITypes.ListBusesQuery>;
export const listBusesForOrg = /* GraphQL */ `query ListBusesForOrg {
  listBusesForOrg {
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
` as GeneratedQuery<
  APITypes.ListBusesForOrgQueryVariables,
  APITypes.ListBusesForOrgQuery
>;
export const listExceptionByOrgId = /* GraphQL */ `query ListExceptionByOrgId(
  $filter: ModelExceptionFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listExceptionByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExceptionByOrgIdQueryVariables,
  APITypes.ListExceptionByOrgIdQuery
>;
export const listExceptions = /* GraphQL */ `query ListExceptions(
  $filter: ModelExceptionFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listExceptions(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExceptionsQueryVariables,
  APITypes.ListExceptionsQuery
>;
export const listOrganizations = /* GraphQL */ `query ListOrganizations(
  $filter: ModelOrganizationFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      loginImageKey
      orgName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrganizationsQueryVariables,
  APITypes.ListOrganizationsQuery
>;
export const listRiderByOrgId = /* GraphQL */ `query ListRiderByOrgId(
  $filter: ModelRiderFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listRiderByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      firstName
      id
      lastName
      orgId
      routeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRiderByOrgIdQueryVariables,
  APITypes.ListRiderByOrgIdQuery
>;
export const listRiders = /* GraphQL */ `query ListRiders(
  $filter: ModelRiderFilterInput
  $limit: Int
  $nextToken: String
) {
  listRiders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      firstName
      id
      lastName
      orgId
      routeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRidersQueryVariables,
  APITypes.ListRidersQuery
>;
export const listRouteActions = /* GraphQL */ `query ListRouteActions(
  $filter: ModelRouteActionFilterInput
  $limit: Int
  $nextToken: String
) {
  listRouteActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      actionType
      createdAt
      driverId
      id
      orgId
      riderIds
      routeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRouteActionsQueryVariables,
  APITypes.ListRouteActionsQuery
>;
export const listRouteByOrgId = /* GraphQL */ `query ListRouteByOrgId(
  $filter: ModelRouteFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listRouteByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      isActive
      orgId
      riders
      routeNumber
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRouteByOrgIdQueryVariables,
  APITypes.ListRouteByOrgIdQuery
>;
export const listRoutes = /* GraphQL */ `query ListRoutes(
  $filter: ModelRouteFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoutes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      isActive
      orgId
      riders
      routeNumber
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRoutesQueryVariables,
  APITypes.ListRoutesQuery
>;
export const listScanByOrgId = /* GraphQL */ `query ListScanByOrgId(
  $filter: ModelScanFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listScanByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      guardianIds
      id
      manualScan
      orgId
      riderIds
      stopId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScanByOrgIdQueryVariables,
  APITypes.ListScanByOrgIdQuery
>;
export const listScans = /* GraphQL */ `query ListScans(
  $filter: ModelScanFilterInput
  $limit: Int
  $nextToken: String
) {
  listScans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      guardianIds
      id
      manualScan
      orgId
      riderIds
      stopId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListScansQueryVariables, APITypes.ListScansQuery>;
export const listSchoolByOrgId = /* GraphQL */ `query ListSchoolByOrgId(
  $filter: ModelSchoolFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listSchoolByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSchoolByOrgIdQueryVariables,
  APITypes.ListSchoolByOrgIdQuery
>;
export const listSchoolHours = /* GraphQL */ `query ListSchoolHours(
  $filter: ModelSchoolHourFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchoolHours(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      dayName
      endTime
      id
      schoolId
      startTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSchoolHoursQueryVariables,
  APITypes.ListSchoolHoursQuery
>;
export const listSchools = /* GraphQL */ `query ListSchools(
  $filter: ModelSchoolFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSchoolsQueryVariables,
  APITypes.ListSchoolsQuery
>;
export const listStopByOrgId = /* GraphQL */ `query ListStopByOrgId(
  $filter: ModelStopFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listStopByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      name
      orgId
      riderIds
      routeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStopByOrgIdQueryVariables,
  APITypes.ListStopByOrgIdQuery
>;
export const listStops = /* GraphQL */ `query ListStops(
  $filter: ModelStopFilterInput
  $limit: Int
  $nextToken: String
) {
  listStops(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      name
      orgId
      riderIds
      routeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListStopsQueryVariables, APITypes.ListStopsQuery>;
export const listUserByOrgId = /* GraphQL */ `query ListUserByOrgId(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $orgId: ID!
  $sortDirection: ModelSortDirection
) {
  listUserByOrgId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    orgId: $orgId
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserByOrgIdQueryVariables,
  APITypes.ListUserByOrgIdQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
