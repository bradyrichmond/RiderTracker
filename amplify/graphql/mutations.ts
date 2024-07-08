/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const addUserToGroup = /* GraphQL */ `mutation AddUserToGroup($groupName: String!, $userId: String!) {
  addUserToGroup(groupName: $groupName, userId: $userId)
}
` as GeneratedMutation<
  APITypes.AddUserToGroupMutationVariables,
  APITypes.AddUserToGroupMutation
>;
export const createAddress = /* GraphQL */ `mutation CreateAddress(
  $condition: ModelAddressConditionInput
  $input: CreateAddressInput!
) {
  createAddress(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAddressMutationVariables,
  APITypes.CreateAddressMutation
>;
export const createAdmin = /* GraphQL */ `mutation CreateAdmin(
  $condition: ModelAdminConditionInput
  $input: CreateAdminInput!
) {
  createAdmin(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAdminMutationVariables,
  APITypes.CreateAdminMutation
>;
export const createBus = /* GraphQL */ `mutation CreateBus(
  $condition: ModelBusConditionInput
  $input: CreateBusInput!
) {
  createBus(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateBusMutationVariables,
  APITypes.CreateBusMutation
>;
export const createException = /* GraphQL */ `mutation CreateException(
  $condition: ModelExceptionConditionInput
  $input: CreateExceptionInput!
) {
  createException(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateExceptionMutationVariables,
  APITypes.CreateExceptionMutation
>;
export const createOrgUser = /* GraphQL */ `mutation CreateOrgUser(
  $email: String!
  $family_name: String!
  $given_name: String!
  $orgId: String!
) {
  createOrgUser(
    email: $email
    family_name: $family_name
    given_name: $given_name
    orgId: $orgId
  ) {
    User {
      Enabled
      UserCreateDate
      UserLastModifiedDate
      UserStatus
      Username
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrgUserMutationVariables,
  APITypes.CreateOrgUserMutation
>;
export const createOrganization = /* GraphQL */ `mutation CreateOrganization(
  $condition: ModelOrganizationConditionInput
  $input: CreateOrganizationInput!
) {
  createOrganization(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateOrganizationMutationVariables,
  APITypes.CreateOrganizationMutation
>;
export const createRider = /* GraphQL */ `mutation CreateRider(
  $condition: ModelRiderConditionInput
  $input: CreateRiderInput!
) {
  createRider(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateRiderMutationVariables,
  APITypes.CreateRiderMutation
>;
export const createRoute = /* GraphQL */ `mutation CreateRoute(
  $condition: ModelRouteConditionInput
  $input: CreateRouteInput!
) {
  createRoute(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateRouteMutationVariables,
  APITypes.CreateRouteMutation
>;
export const createRouteAction = /* GraphQL */ `mutation CreateRouteAction(
  $condition: ModelRouteActionConditionInput
  $input: CreateRouteActionInput!
) {
  createRouteAction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateRouteActionMutationVariables,
  APITypes.CreateRouteActionMutation
>;
export const createScan = /* GraphQL */ `mutation CreateScan(
  $condition: ModelScanConditionInput
  $input: CreateScanInput!
) {
  createScan(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateScanMutationVariables,
  APITypes.CreateScanMutation
>;
export const createSchool = /* GraphQL */ `mutation CreateSchool(
  $condition: ModelSchoolConditionInput
  $input: CreateSchoolInput!
) {
  createSchool(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSchoolMutationVariables,
  APITypes.CreateSchoolMutation
>;
export const createSchoolHour = /* GraphQL */ `mutation CreateSchoolHour(
  $condition: ModelSchoolHourConditionInput
  $input: CreateSchoolHourInput!
) {
  createSchoolHour(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSchoolHourMutationVariables,
  APITypes.CreateSchoolHourMutation
>;
export const createStop = /* GraphQL */ `mutation CreateStop(
  $condition: ModelStopConditionInput
  $input: CreateStopInput!
) {
  createStop(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateStopMutationVariables,
  APITypes.CreateStopMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteAddress = /* GraphQL */ `mutation DeleteAddress(
  $condition: ModelAddressConditionInput
  $input: DeleteAddressInput!
) {
  deleteAddress(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteAddressMutationVariables,
  APITypes.DeleteAddressMutation
>;
export const deleteAdmin = /* GraphQL */ `mutation DeleteAdmin(
  $condition: ModelAdminConditionInput
  $input: DeleteAdminInput!
) {
  deleteAdmin(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteAdminMutationVariables,
  APITypes.DeleteAdminMutation
>;
export const deleteBus = /* GraphQL */ `mutation DeleteBus(
  $condition: ModelBusConditionInput
  $input: DeleteBusInput!
) {
  deleteBus(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteBusMutationVariables,
  APITypes.DeleteBusMutation
>;
export const deleteException = /* GraphQL */ `mutation DeleteException(
  $condition: ModelExceptionConditionInput
  $input: DeleteExceptionInput!
) {
  deleteException(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteExceptionMutationVariables,
  APITypes.DeleteExceptionMutation
>;
export const deleteOrganization = /* GraphQL */ `mutation DeleteOrganization(
  $condition: ModelOrganizationConditionInput
  $input: DeleteOrganizationInput!
) {
  deleteOrganization(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteOrganizationMutationVariables,
  APITypes.DeleteOrganizationMutation
>;
export const deleteRider = /* GraphQL */ `mutation DeleteRider(
  $condition: ModelRiderConditionInput
  $input: DeleteRiderInput!
) {
  deleteRider(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteRiderMutationVariables,
  APITypes.DeleteRiderMutation
>;
export const deleteRoute = /* GraphQL */ `mutation DeleteRoute(
  $condition: ModelRouteConditionInput
  $input: DeleteRouteInput!
) {
  deleteRoute(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteRouteMutationVariables,
  APITypes.DeleteRouteMutation
>;
export const deleteRouteAction = /* GraphQL */ `mutation DeleteRouteAction(
  $condition: ModelRouteActionConditionInput
  $input: DeleteRouteActionInput!
) {
  deleteRouteAction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteRouteActionMutationVariables,
  APITypes.DeleteRouteActionMutation
>;
export const deleteScan = /* GraphQL */ `mutation DeleteScan(
  $condition: ModelScanConditionInput
  $input: DeleteScanInput!
) {
  deleteScan(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteScanMutationVariables,
  APITypes.DeleteScanMutation
>;
export const deleteSchool = /* GraphQL */ `mutation DeleteSchool(
  $condition: ModelSchoolConditionInput
  $input: DeleteSchoolInput!
) {
  deleteSchool(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSchoolMutationVariables,
  APITypes.DeleteSchoolMutation
>;
export const deleteSchoolHour = /* GraphQL */ `mutation DeleteSchoolHour(
  $condition: ModelSchoolHourConditionInput
  $input: DeleteSchoolHourInput!
) {
  deleteSchoolHour(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSchoolHourMutationVariables,
  APITypes.DeleteSchoolHourMutation
>;
export const deleteStop = /* GraphQL */ `mutation DeleteStop(
  $condition: ModelStopConditionInput
  $input: DeleteStopInput!
) {
  deleteStop(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteStopMutationVariables,
  APITypes.DeleteStopMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateAddress = /* GraphQL */ `mutation UpdateAddress(
  $condition: ModelAddressConditionInput
  $input: UpdateAddressInput!
) {
  updateAddress(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateAddressMutationVariables,
  APITypes.UpdateAddressMutation
>;
export const updateAdmin = /* GraphQL */ `mutation UpdateAdmin(
  $condition: ModelAdminConditionInput
  $input: UpdateAdminInput!
) {
  updateAdmin(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateAdminMutationVariables,
  APITypes.UpdateAdminMutation
>;
export const updateBus = /* GraphQL */ `mutation UpdateBus(
  $condition: ModelBusConditionInput
  $input: UpdateBusInput!
) {
  updateBus(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateBusMutationVariables,
  APITypes.UpdateBusMutation
>;
export const updateException = /* GraphQL */ `mutation UpdateException(
  $condition: ModelExceptionConditionInput
  $input: UpdateExceptionInput!
) {
  updateException(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateExceptionMutationVariables,
  APITypes.UpdateExceptionMutation
>;
export const updateOrganization = /* GraphQL */ `mutation UpdateOrganization(
  $condition: ModelOrganizationConditionInput
  $input: UpdateOrganizationInput!
) {
  updateOrganization(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateOrganizationMutationVariables,
  APITypes.UpdateOrganizationMutation
>;
export const updateRider = /* GraphQL */ `mutation UpdateRider(
  $condition: ModelRiderConditionInput
  $input: UpdateRiderInput!
) {
  updateRider(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateRiderMutationVariables,
  APITypes.UpdateRiderMutation
>;
export const updateRoute = /* GraphQL */ `mutation UpdateRoute(
  $condition: ModelRouteConditionInput
  $input: UpdateRouteInput!
) {
  updateRoute(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateRouteMutationVariables,
  APITypes.UpdateRouteMutation
>;
export const updateRouteAction = /* GraphQL */ `mutation UpdateRouteAction(
  $condition: ModelRouteActionConditionInput
  $input: UpdateRouteActionInput!
) {
  updateRouteAction(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateRouteActionMutationVariables,
  APITypes.UpdateRouteActionMutation
>;
export const updateScan = /* GraphQL */ `mutation UpdateScan(
  $condition: ModelScanConditionInput
  $input: UpdateScanInput!
) {
  updateScan(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateScanMutationVariables,
  APITypes.UpdateScanMutation
>;
export const updateSchool = /* GraphQL */ `mutation UpdateSchool(
  $condition: ModelSchoolConditionInput
  $input: UpdateSchoolInput!
) {
  updateSchool(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSchoolMutationVariables,
  APITypes.UpdateSchoolMutation
>;
export const updateSchoolHour = /* GraphQL */ `mutation UpdateSchoolHour(
  $condition: ModelSchoolHourConditionInput
  $input: UpdateSchoolHourInput!
) {
  updateSchoolHour(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSchoolHourMutationVariables,
  APITypes.UpdateSchoolHourMutation
>;
export const updateStop = /* GraphQL */ `mutation UpdateStop(
  $condition: ModelStopConditionInput
  $input: UpdateStopInput!
) {
  updateStop(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateStopMutationVariables,
  APITypes.UpdateStopMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const validateAddress = /* GraphQL */ `mutation ValidateAddress($address: String!) {
  validateAddress(address: $address) {
    city
    country
    county
    formatted
    houseNumber
    lat
    lon
    postcode
    state
    streetName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ValidateAddressMutationVariables,
  APITypes.ValidateAddressMutation
>;
