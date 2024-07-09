/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Address = {
  __typename: "Address",
  city: string,
  country: string,
  county: string,
  createdAt: string,
  formatted: string,
  houseNumber: string,
  id: string,
  lat: string,
  lon: string,
  orgId: string,
  postcode: string,
  school?: School | null,
  schoolId?: string | null,
  state: string,
  streetName: string,
  updatedAt: string,
};

export type School = {
  __typename: "School",
  SchoolHours?: ModelSchoolHourConnection | null,
  address?: Address | null,
  addressId: string,
  createdAt: string,
  id: string,
  orgId: string,
  organization?: Organization | null,
  riderIds?: Array< string | null > | null,
  schoolName: string,
  stopIds?: Array< string | null > | null,
  updatedAt: string,
};

export type ModelSchoolHourConnection = {
  __typename: "ModelSchoolHourConnection",
  items:  Array<SchoolHour | null >,
  nextToken?: string | null,
};

export type SchoolHour = {
  __typename: "SchoolHour",
  createdAt: string,
  dayName: string,
  endTime: string,
  id: string,
  school?: School | null,
  schoolId: string,
  startTime: string,
  updatedAt: string,
};

export type Organization = {
  __typename: "Organization",
  admins?: ModelAdminConnection | null,
  buses?: ModelBusConnection | null,
  createdAt: string,
  id: string,
  loginImageKey?: string | null,
  orgName: string,
  riders?: ModelRiderConnection | null,
  routeActions?: ModelRouteActionConnection | null,
  routes?: ModelRouteConnection | null,
  schools?: ModelSchoolConnection | null,
  stops?: ModelStopConnection | null,
  updatedAt: string,
  users?: ModelUserConnection | null,
};

export type ModelAdminConnection = {
  __typename: "ModelAdminConnection",
  items:  Array<Admin | null >,
  nextToken?: string | null,
};

export type Admin = {
  __typename: "Admin",
  createdAt: string,
  id: string,
  org?: Organization | null,
  orgId: string,
  updatedAt: string,
  user?: User | null,
  userId: string,
};

export type User = {
  __typename: "User",
  admin?: Admin | null,
  adminId?: string | null,
  createdAt: string,
  email?: string | null,
  firstName: string,
  id: string,
  lastName: string,
  orgId: string,
  organization?: Organization | null,
  stopId?: string | null,
  title?: string | null,
  updatedAt: string,
};

export type ModelBusConnection = {
  __typename: "ModelBusConnection",
  items:  Array<Bus | null >,
  nextToken?: string | null,
};

export type Bus = {
  __typename: "Bus",
  busNumber: string,
  createdAt: string,
  id: string,
  orgId: string,
  organization?: Organization | null,
  updatedAt: string,
};

export type ModelRiderConnection = {
  __typename: "ModelRiderConnection",
  items:  Array<Rider | null >,
  nextToken?: string | null,
};

export type Rider = {
  __typename: "Rider",
  createdAt: string,
  firstName: string,
  id: string,
  lastName: string,
  orgId: string,
  organization?: Organization | null,
  routeId: string,
  updatedAt: string,
};

export type ModelRouteActionConnection = {
  __typename: "ModelRouteActionConnection",
  items:  Array<RouteAction | null >,
  nextToken?: string | null,
};

export type RouteAction = {
  __typename: "RouteAction",
  actionType: RouteActionTypes,
  createdAt: string,
  driverId: string,
  id: string,
  orgId: string,
  organization?: Organization | null,
  riderIds?: Array< string | null > | null,
  routeId: string,
  updatedAt: string,
};

export enum RouteActionTypes {
  ROUTE_END = "ROUTE_END",
  ROUTE_SCAN = "ROUTE_SCAN",
  ROUTE_START = "ROUTE_START",
}


export type ModelRouteConnection = {
  __typename: "ModelRouteConnection",
  items:  Array<Route | null >,
  nextToken?: string | null,
};

export type Route = {
  __typename: "Route",
  createdAt: string,
  id: string,
  isActive?: boolean | null,
  orgId: string,
  organization?: Organization | null,
  riders: Array< string | null >,
  routeNumber: string,
  updatedAt: string,
};

export type ModelSchoolConnection = {
  __typename: "ModelSchoolConnection",
  items:  Array<School | null >,
  nextToken?: string | null,
};

export type ModelStopConnection = {
  __typename: "ModelStopConnection",
  items:  Array<Stop | null >,
  nextToken?: string | null,
};

export type Stop = {
  __typename: "Stop",
  createdAt: string,
  id: string,
  name: string,
  orgId: string,
  organization?: Organization | null,
  riderIds: Array< string | null >,
  routeId: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type Exception = {
  __typename: "Exception",
  authorized?: boolean | null,
  createdAt: string,
  date: string,
  dropoff: OverrideType,
  dropoffGuardianId?: string | null,
  dropoffStopId?: string | null,
  id: string,
  orgId: string,
  pickup: OverrideType,
  pickupGuardianId?: string | null,
  pickupStopId?: string | null,
  riderId?: string | null,
  updatedAt: string,
};

export enum OverrideType {
  CANCEL = "CANCEL",
  NO_CHANGE = "NO_CHANGE",
  OVERRIDE = "OVERRIDE",
}


export type Scan = {
  __typename: "Scan",
  createdAt: string,
  deviceLocationOnSubmit?: Location | null,
  guardianIds?: Array< string | null > | null,
  id: string,
  manualScan?: boolean | null,
  orgId: string,
  riderIds: Array< string | null >,
  stopId: string,
  updatedAt: string,
};

export type Location = {
  __typename: "Location",
  lat: string,
  lon: string,
};

export type ModelAddressFilterInput = {
  and?: Array< ModelAddressFilterInput | null > | null,
  city?: ModelStringInput | null,
  country?: ModelStringInput | null,
  county?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  formatted?: ModelStringInput | null,
  houseNumber?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lat?: ModelStringInput | null,
  lon?: ModelStringInput | null,
  not?: ModelAddressFilterInput | null,
  or?: Array< ModelAddressFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  postcode?: ModelStringInput | null,
  schoolId?: ModelIDInput | null,
  state?: ModelStringInput | null,
  streetName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelAddressConnection = {
  __typename: "ModelAddressConnection",
  items:  Array<Address | null >,
  nextToken?: string | null,
};

export type ModelAdminFilterInput = {
  and?: Array< ModelAdminFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelAdminFilterInput | null,
  or?: Array< ModelAdminFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelBusFilterInput = {
  and?: Array< ModelBusFilterInput | null > | null,
  busNumber?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelBusFilterInput | null,
  or?: Array< ModelBusFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelExceptionFilterInput = {
  and?: Array< ModelExceptionFilterInput | null > | null,
  authorized?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  dropoff?: ModelOverrideTypeInput | null,
  dropoffGuardianId?: ModelIDInput | null,
  dropoffStopId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelExceptionFilterInput | null,
  or?: Array< ModelExceptionFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  pickup?: ModelOverrideTypeInput | null,
  pickupGuardianId?: ModelIDInput | null,
  pickupStopId?: ModelIDInput | null,
  riderId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelOverrideTypeInput = {
  eq?: OverrideType | null,
  ne?: OverrideType | null,
};

export type ModelExceptionConnection = {
  __typename: "ModelExceptionConnection",
  items:  Array<Exception | null >,
  nextToken?: string | null,
};

export type ModelOrganizationFilterInput = {
  and?: Array< ModelOrganizationFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  loginImageKey?: ModelStringInput | null,
  not?: ModelOrganizationFilterInput | null,
  or?: Array< ModelOrganizationFilterInput | null > | null,
  orgName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelOrganizationConnection = {
  __typename: "ModelOrganizationConnection",
  items:  Array<Organization | null >,
  nextToken?: string | null,
};

export type ModelRiderFilterInput = {
  and?: Array< ModelRiderFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelRiderFilterInput | null,
  or?: Array< ModelRiderFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  routeId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelRouteActionFilterInput = {
  actionType?: ModelRouteActionTypesInput | null,
  and?: Array< ModelRouteActionFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  driverId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelRouteActionFilterInput | null,
  or?: Array< ModelRouteActionFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  routeId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelRouteActionTypesInput = {
  eq?: RouteActionTypes | null,
  ne?: RouteActionTypes | null,
};

export type ModelRouteFilterInput = {
  and?: Array< ModelRouteFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  not?: ModelRouteFilterInput | null,
  or?: Array< ModelRouteFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  riders?: ModelIDInput | null,
  routeNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelScanFilterInput = {
  and?: Array< ModelScanFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  guardianIds?: ModelIDInput | null,
  id?: ModelIDInput | null,
  manualScan?: ModelBooleanInput | null,
  not?: ModelScanFilterInput | null,
  or?: Array< ModelScanFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  stopId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelScanConnection = {
  __typename: "ModelScanConnection",
  items:  Array<Scan | null >,
  nextToken?: string | null,
};

export type ModelSchoolFilterInput = {
  addressId?: ModelIDInput | null,
  and?: Array< ModelSchoolFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelSchoolFilterInput | null,
  or?: Array< ModelSchoolFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  schoolName?: ModelStringInput | null,
  stopIds?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSchoolHourFilterInput = {
  and?: Array< ModelSchoolHourFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  dayName?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelSchoolHourFilterInput | null,
  or?: Array< ModelSchoolHourFilterInput | null > | null,
  schoolId?: ModelIDInput | null,
  startTime?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStopFilterInput = {
  and?: Array< ModelStopFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelStopFilterInput | null,
  or?: Array< ModelStopFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  routeId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelUserFilterInput = {
  adminId?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  orgId?: ModelIDInput | null,
  stopId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelAddressConditionInput = {
  and?: Array< ModelAddressConditionInput | null > | null,
  city?: ModelStringInput | null,
  country?: ModelStringInput | null,
  county?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  formatted?: ModelStringInput | null,
  houseNumber?: ModelStringInput | null,
  lat?: ModelStringInput | null,
  lon?: ModelStringInput | null,
  not?: ModelAddressConditionInput | null,
  or?: Array< ModelAddressConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  postcode?: ModelStringInput | null,
  schoolId?: ModelIDInput | null,
  state?: ModelStringInput | null,
  streetName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateAddressInput = {
  city: string,
  country: string,
  county: string,
  formatted: string,
  houseNumber: string,
  id?: string | null,
  lat: string,
  lon: string,
  orgId: string,
  postcode: string,
  schoolId?: string | null,
  state: string,
  streetName: string,
};

export type ModelAdminConditionInput = {
  and?: Array< ModelAdminConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelAdminConditionInput | null,
  or?: Array< ModelAdminConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateAdminInput = {
  id?: string | null,
  orgId: string,
  userId: string,
};

export type ModelBusConditionInput = {
  and?: Array< ModelBusConditionInput | null > | null,
  busNumber?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelBusConditionInput | null,
  or?: Array< ModelBusConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateBusInput = {
  busNumber: string,
  id?: string | null,
  orgId: string,
};

export type ModelExceptionConditionInput = {
  and?: Array< ModelExceptionConditionInput | null > | null,
  authorized?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  date?: ModelStringInput | null,
  dropoff?: ModelOverrideTypeInput | null,
  dropoffGuardianId?: ModelIDInput | null,
  dropoffStopId?: ModelIDInput | null,
  not?: ModelExceptionConditionInput | null,
  or?: Array< ModelExceptionConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  pickup?: ModelOverrideTypeInput | null,
  pickupGuardianId?: ModelIDInput | null,
  pickupStopId?: ModelIDInput | null,
  riderId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateExceptionInput = {
  authorized?: boolean | null,
  date: string,
  dropoff: OverrideType,
  dropoffGuardianId?: string | null,
  dropoffStopId?: string | null,
  id?: string | null,
  orgId: string,
  pickup: OverrideType,
  pickupGuardianId?: string | null,
  pickupStopId?: string | null,
  riderId?: string | null,
};

export type CreateAdminOutput = {
  __typename: "CreateAdminOutput",
  User?: CreateAdminOutputUser | null,
};

export type CreateAdminOutputUser = {
  __typename: "CreateAdminOutputUser",
  Attributes?:  Array<AttributeType | null > | null,
  Enabled: boolean,
  MFAOptions?:  Array<MFAOptionType | null > | null,
  UserCreateDate: string,
  UserLastModifiedDate: string,
  UserStatus?: UserStatusType | null,
  Username: string,
};

export type AttributeType = {
  __typename: "AttributeType",
  Name: string,
  Value: string,
};

export type MFAOptionType = {
  __typename: "MFAOptionType",
  AttributeName: string,
  DeliveryMedium?: DeliveryMediumType | null,
};

export enum DeliveryMediumType {
  EMAIL = "EMAIL",
  SMS = "SMS",
}


export enum UserStatusType {
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  CONFIRMED = "CONFIRMED",
  EXTERNAL_PROVIDER = "EXTERNAL_PROVIDER",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
  RESET_REQUIRED = "RESET_REQUIRED",
  UNCONFIRMED = "UNCONFIRMED",
  UNKNOWN = "UNKNOWN",
}


export type ModelOrganizationConditionInput = {
  and?: Array< ModelOrganizationConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  loginImageKey?: ModelStringInput | null,
  not?: ModelOrganizationConditionInput | null,
  or?: Array< ModelOrganizationConditionInput | null > | null,
  orgName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateOrganizationInput = {
  id?: string | null,
  loginImageKey?: string | null,
  orgName: string,
};

export type ModelRiderConditionInput = {
  and?: Array< ModelRiderConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelRiderConditionInput | null,
  or?: Array< ModelRiderConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  routeId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateRiderInput = {
  firstName: string,
  id?: string | null,
  lastName: string,
  orgId: string,
  routeId: string,
};

export type ModelRouteConditionInput = {
  and?: Array< ModelRouteConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  not?: ModelRouteConditionInput | null,
  or?: Array< ModelRouteConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  riders?: ModelIDInput | null,
  routeNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateRouteInput = {
  id?: string | null,
  isActive?: boolean | null,
  orgId: string,
  riders: Array< string | null >,
  routeNumber: string,
};

export type ModelRouteActionConditionInput = {
  actionType?: ModelRouteActionTypesInput | null,
  and?: Array< ModelRouteActionConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  driverId?: ModelIDInput | null,
  not?: ModelRouteActionConditionInput | null,
  or?: Array< ModelRouteActionConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  routeId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateRouteActionInput = {
  actionType: RouteActionTypes,
  driverId: string,
  id?: string | null,
  orgId: string,
  riderIds?: Array< string | null > | null,
  routeId: string,
};

export type ModelScanConditionInput = {
  and?: Array< ModelScanConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  guardianIds?: ModelIDInput | null,
  manualScan?: ModelBooleanInput | null,
  not?: ModelScanConditionInput | null,
  or?: Array< ModelScanConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  stopId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateScanInput = {
  deviceLocationOnSubmit?: LocationInput | null,
  guardianIds?: Array< string | null > | null,
  id?: string | null,
  manualScan?: boolean | null,
  orgId: string,
  riderIds: Array< string | null >,
  stopId: string,
};

export type LocationInput = {
  lat: string,
  lon: string,
};

export type ModelSchoolConditionInput = {
  addressId?: ModelIDInput | null,
  and?: Array< ModelSchoolConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelSchoolConditionInput | null,
  or?: Array< ModelSchoolConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  schoolName?: ModelStringInput | null,
  stopIds?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSchoolInput = {
  addressId: string,
  id?: string | null,
  orgId: string,
  riderIds?: Array< string | null > | null,
  schoolName: string,
  stopIds?: Array< string | null > | null,
};

export type ModelSchoolHourConditionInput = {
  and?: Array< ModelSchoolHourConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  dayName?: ModelStringInput | null,
  endTime?: ModelStringInput | null,
  not?: ModelSchoolHourConditionInput | null,
  or?: Array< ModelSchoolHourConditionInput | null > | null,
  schoolId?: ModelIDInput | null,
  startTime?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSchoolHourInput = {
  dayName: string,
  endTime: string,
  id?: string | null,
  schoolId: string,
  startTime: string,
};

export type ModelStopConditionInput = {
  and?: Array< ModelStopConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelStopConditionInput | null,
  or?: Array< ModelStopConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  riderIds?: ModelIDInput | null,
  routeId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateStopInput = {
  id?: string | null,
  name: string,
  orgId: string,
  riderIds: Array< string | null >,
  routeId: string,
};

export type ModelUserConditionInput = {
  adminId?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  orgId?: ModelIDInput | null,
  stopId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserInput = {
  adminId?: string | null,
  email?: string | null,
  firstName: string,
  id?: string | null,
  lastName: string,
  orgId: string,
  stopId?: string | null,
  title?: string | null,
};

export type DeleteAddressInput = {
  id: string,
};

export type DeleteAdminInput = {
  id: string,
};

export type DeleteBusInput = {
  id: string,
};

export type DeleteExceptionInput = {
  id: string,
};

export type DeleteOrganizationInput = {
  id: string,
};

export type DeleteRiderInput = {
  id: string,
};

export type DeleteRouteInput = {
  id: string,
};

export type DeleteRouteActionInput = {
  id: string,
};

export type DeleteScanInput = {
  id: string,
};

export type DeleteSchoolInput = {
  id: string,
};

export type DeleteSchoolHourInput = {
  id: string,
};

export type DeleteStopInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateAddressInput = {
  city?: string | null,
  country?: string | null,
  county?: string | null,
  formatted?: string | null,
  houseNumber?: string | null,
  id: string,
  lat?: string | null,
  lon?: string | null,
  orgId?: string | null,
  postcode?: string | null,
  schoolId?: string | null,
  state?: string | null,
  streetName?: string | null,
};

export type UpdateAdminInput = {
  id: string,
  orgId?: string | null,
  userId?: string | null,
};

export type UpdateBusInput = {
  busNumber?: string | null,
  id: string,
  orgId?: string | null,
};

export type UpdateExceptionInput = {
  authorized?: boolean | null,
  date?: string | null,
  dropoff?: OverrideType | null,
  dropoffGuardianId?: string | null,
  dropoffStopId?: string | null,
  id: string,
  orgId?: string | null,
  pickup?: OverrideType | null,
  pickupGuardianId?: string | null,
  pickupStopId?: string | null,
  riderId?: string | null,
};

export type UpdateOrganizationInput = {
  id: string,
  loginImageKey?: string | null,
  orgName?: string | null,
};

export type UpdateRiderInput = {
  firstName?: string | null,
  id: string,
  lastName?: string | null,
  orgId?: string | null,
  routeId?: string | null,
};

export type UpdateRouteInput = {
  id: string,
  isActive?: boolean | null,
  orgId?: string | null,
  riders?: Array< string | null > | null,
  routeNumber?: string | null,
};

export type UpdateRouteActionInput = {
  actionType?: RouteActionTypes | null,
  driverId?: string | null,
  id: string,
  orgId?: string | null,
  riderIds?: Array< string | null > | null,
  routeId?: string | null,
};

export type UpdateScanInput = {
  deviceLocationOnSubmit?: LocationInput | null,
  guardianIds?: Array< string | null > | null,
  id: string,
  manualScan?: boolean | null,
  orgId?: string | null,
  riderIds?: Array< string | null > | null,
  stopId?: string | null,
};

export type UpdateSchoolInput = {
  addressId?: string | null,
  id: string,
  orgId?: string | null,
  riderIds?: Array< string | null > | null,
  schoolName?: string | null,
  stopIds?: Array< string | null > | null,
};

export type UpdateSchoolHourInput = {
  dayName?: string | null,
  endTime?: string | null,
  id: string,
  schoolId?: string | null,
  startTime?: string | null,
};

export type UpdateStopInput = {
  id: string,
  name?: string | null,
  orgId?: string | null,
  riderIds?: Array< string | null > | null,
  routeId?: string | null,
};

export type UpdateUserInput = {
  adminId?: string | null,
  email?: string | null,
  firstName?: string | null,
  id: string,
  lastName?: string | null,
  orgId?: string | null,
  stopId?: string | null,
  title?: string | null,
};

export type ValidatedAddress = {
  __typename: "ValidatedAddress",
  city: string,
  country: string,
  county: string,
  formatted: string,
  houseNumber: string,
  lat: string,
  lon: string,
  postcode: string,
  state: string,
  streetName: string,
};

export type ModelSubscriptionAddressFilterInput = {
  and?: Array< ModelSubscriptionAddressFilterInput | null > | null,
  city?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  county?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  formatted?: ModelSubscriptionStringInput | null,
  houseNumber?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lat?: ModelSubscriptionStringInput | null,
  lon?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionAddressFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  postcode?: ModelSubscriptionStringInput | null,
  schoolId?: ModelSubscriptionIDInput | null,
  state?: ModelSubscriptionStringInput | null,
  streetName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionAdminFilterInput = {
  and?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionBusFilterInput = {
  and?: Array< ModelSubscriptionBusFilterInput | null > | null,
  busNumber?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionBusFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionExceptionFilterInput = {
  and?: Array< ModelSubscriptionExceptionFilterInput | null > | null,
  authorized?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  dropoff?: ModelSubscriptionStringInput | null,
  dropoffGuardianId?: ModelSubscriptionIDInput | null,
  dropoffStopId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionExceptionFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  pickup?: ModelSubscriptionStringInput | null,
  pickupGuardianId?: ModelSubscriptionIDInput | null,
  pickupStopId?: ModelSubscriptionIDInput | null,
  riderId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionOrganizationFilterInput = {
  and?: Array< ModelSubscriptionOrganizationFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  loginImageKey?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionOrganizationFilterInput | null > | null,
  orgName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionRiderFilterInput = {
  and?: Array< ModelSubscriptionRiderFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionRiderFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  routeId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionRouteFilterInput = {
  and?: Array< ModelSubscriptionRouteFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionRouteFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  riders?: ModelSubscriptionIDInput | null,
  routeNumber?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionRouteActionFilterInput = {
  actionType?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRouteActionFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  driverId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionRouteActionFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  riderIds?: ModelSubscriptionIDInput | null,
  routeId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionScanFilterInput = {
  and?: Array< ModelSubscriptionScanFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  guardianIds?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  manualScan?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionScanFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  riderIds?: ModelSubscriptionIDInput | null,
  stopId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSchoolFilterInput = {
  addressId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionSchoolFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionSchoolFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  riderIds?: ModelSubscriptionIDInput | null,
  schoolName?: ModelSubscriptionStringInput | null,
  stopIds?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSchoolHourFilterInput = {
  and?: Array< ModelSubscriptionSchoolHourFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  dayName?: ModelSubscriptionStringInput | null,
  endTime?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionSchoolHourFilterInput | null > | null,
  schoolId?: ModelSubscriptionIDInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStopFilterInput = {
  and?: Array< ModelSubscriptionStopFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionStopFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  riderIds?: ModelSubscriptionIDInput | null,
  routeId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  adminId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  orgId?: ModelSubscriptionIDInput | null,
  stopId?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetAddressQueryVariables = {
  id: string,
};

export type GetAddressQuery = {
  getAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type GetAdminQueryVariables = {
  id: string,
};

export type GetAdminQuery = {
  getAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type GetBusQueryVariables = {
  id: string,
};

export type GetBusQuery = {
  getBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type GetCurrentUserQueryVariables = {
};

export type GetCurrentUserQuery = {
  getCurrentUser:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  },
};

export type GetExceptionQueryVariables = {
  id: string,
};

export type GetExceptionQuery = {
  getException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetOrganizationQueryVariables = {
  id: string,
};

export type GetOrganizationQuery = {
  getOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetRiderQueryVariables = {
  id: string,
};

export type GetRiderQuery = {
  getRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type GetRouteQueryVariables = {
  id: string,
};

export type GetRouteQuery = {
  getRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type GetRouteActionQueryVariables = {
  id: string,
};

export type GetRouteActionQuery = {
  getRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type GetScanQueryVariables = {
  id: string,
};

export type GetScanQuery = {
  getScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type GetSchoolQueryVariables = {
  id: string,
};

export type GetSchoolQuery = {
  getSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type GetSchoolHourQueryVariables = {
  id: string,
};

export type GetSchoolHourQuery = {
  getSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type GetStopQueryVariables = {
  id: string,
};

export type GetStopQuery = {
  getStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type GetUserOrgQueryVariables = {
};

export type GetUserOrgQuery = {
  getUserOrg?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListAddressByOrgIdQueryVariables = {
  filter?: ModelAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListAddressByOrgIdQuery = {
  listAddressByOrgId?:  {
    __typename: "ModelAddressConnection",
    items:  Array< {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAddressesQueryVariables = {
  filter?: ModelAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAddressesQuery = {
  listAddresses?:  {
    __typename: "ModelAddressConnection",
    items:  Array< {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAdminByOrgIdQueryVariables = {
  filter?: ModelAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListAdminByOrgIdQuery = {
  listAdminByOrgId?:  {
    __typename: "ModelAdminConnection",
    items:  Array< {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAdminsQueryVariables = {
  filter?: ModelAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdminsQuery = {
  listAdmins?:  {
    __typename: "ModelAdminConnection",
    items:  Array< {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListBusByOrgIdQueryVariables = {
  filter?: ModelBusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListBusByOrgIdQuery = {
  listBusByOrgId?:  {
    __typename: "ModelBusConnection",
    items:  Array< {
      __typename: "Bus",
      busNumber: string,
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListBusesQueryVariables = {
  filter?: ModelBusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBusesQuery = {
  listBuses?:  {
    __typename: "ModelBusConnection",
    items:  Array< {
      __typename: "Bus",
      busNumber: string,
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListBusesForOrgQueryVariables = {
};

export type ListBusesForOrgQuery = {
  listBusesForOrg:  Array< {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null >,
};

export type ListExceptionByOrgIdQueryVariables = {
  filter?: ModelExceptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListExceptionByOrgIdQuery = {
  listExceptionByOrgId?:  {
    __typename: "ModelExceptionConnection",
    items:  Array< {
      __typename: "Exception",
      authorized?: boolean | null,
      createdAt: string,
      date: string,
      dropoff: OverrideType,
      dropoffGuardianId?: string | null,
      dropoffStopId?: string | null,
      id: string,
      orgId: string,
      pickup: OverrideType,
      pickupGuardianId?: string | null,
      pickupStopId?: string | null,
      riderId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListExceptionsQueryVariables = {
  filter?: ModelExceptionFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListExceptionsQuery = {
  listExceptions?:  {
    __typename: "ModelExceptionConnection",
    items:  Array< {
      __typename: "Exception",
      authorized?: boolean | null,
      createdAt: string,
      date: string,
      dropoff: OverrideType,
      dropoffGuardianId?: string | null,
      dropoffStopId?: string | null,
      id: string,
      orgId: string,
      pickup: OverrideType,
      pickupGuardianId?: string | null,
      pickupStopId?: string | null,
      riderId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListOrganizationsQueryVariables = {
  filter?: ModelOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrganizationsQuery = {
  listOrganizations?:  {
    __typename: "ModelOrganizationConnection",
    items:  Array< {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRiderByOrgIdQueryVariables = {
  filter?: ModelRiderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListRiderByOrgIdQuery = {
  listRiderByOrgId?:  {
    __typename: "ModelRiderConnection",
    items:  Array< {
      __typename: "Rider",
      createdAt: string,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      routeId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRidersQueryVariables = {
  filter?: ModelRiderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRidersQuery = {
  listRiders?:  {
    __typename: "ModelRiderConnection",
    items:  Array< {
      __typename: "Rider",
      createdAt: string,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      routeId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRouteActionsQueryVariables = {
  filter?: ModelRouteActionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRouteActionsQuery = {
  listRouteActions?:  {
    __typename: "ModelRouteActionConnection",
    items:  Array< {
      __typename: "RouteAction",
      actionType: RouteActionTypes,
      createdAt: string,
      driverId: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      routeId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRouteByOrgIdQueryVariables = {
  filter?: ModelRouteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListRouteByOrgIdQuery = {
  listRouteByOrgId?:  {
    __typename: "ModelRouteConnection",
    items:  Array< {
      __typename: "Route",
      createdAt: string,
      id: string,
      isActive?: boolean | null,
      orgId: string,
      riders: Array< string | null >,
      routeNumber: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRoutesQueryVariables = {
  filter?: ModelRouteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoutesQuery = {
  listRoutes?:  {
    __typename: "ModelRouteConnection",
    items:  Array< {
      __typename: "Route",
      createdAt: string,
      id: string,
      isActive?: boolean | null,
      orgId: string,
      riders: Array< string | null >,
      routeNumber: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListScanByOrgIdQueryVariables = {
  filter?: ModelScanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListScanByOrgIdQuery = {
  listScanByOrgId?:  {
    __typename: "ModelScanConnection",
    items:  Array< {
      __typename: "Scan",
      createdAt: string,
      guardianIds?: Array< string | null > | null,
      id: string,
      manualScan?: boolean | null,
      orgId: string,
      riderIds: Array< string | null >,
      stopId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListScansQueryVariables = {
  filter?: ModelScanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScansQuery = {
  listScans?:  {
    __typename: "ModelScanConnection",
    items:  Array< {
      __typename: "Scan",
      createdAt: string,
      guardianIds?: Array< string | null > | null,
      id: string,
      manualScan?: boolean | null,
      orgId: string,
      riderIds: Array< string | null >,
      stopId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchoolByOrgIdQueryVariables = {
  filter?: ModelSchoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListSchoolByOrgIdQuery = {
  listSchoolByOrgId?:  {
    __typename: "ModelSchoolConnection",
    items:  Array< {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchoolHoursQueryVariables = {
  filter?: ModelSchoolHourFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchoolHoursQuery = {
  listSchoolHours?:  {
    __typename: "ModelSchoolHourConnection",
    items:  Array< {
      __typename: "SchoolHour",
      createdAt: string,
      dayName: string,
      endTime: string,
      id: string,
      schoolId: string,
      startTime: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSchoolsQueryVariables = {
  filter?: ModelSchoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchoolsQuery = {
  listSchools?:  {
    __typename: "ModelSchoolConnection",
    items:  Array< {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStopByOrgIdQueryVariables = {
  filter?: ModelStopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListStopByOrgIdQuery = {
  listStopByOrgId?:  {
    __typename: "ModelStopConnection",
    items:  Array< {
      __typename: "Stop",
      createdAt: string,
      id: string,
      name: string,
      orgId: string,
      riderIds: Array< string | null >,
      routeId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListStopsQueryVariables = {
  filter?: ModelStopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStopsQuery = {
  listStops?:  {
    __typename: "ModelStopConnection",
    items:  Array< {
      __typename: "Stop",
      createdAt: string,
      id: string,
      name: string,
      orgId: string,
      riderIds: Array< string | null >,
      routeId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserByOrgIdQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  orgId: string,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserByOrgIdQuery = {
  listUserByOrgId?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AddUserToGroupMutationVariables = {
  groupName: string,
  userId: string,
};

export type AddUserToGroupMutation = {
  addUserToGroup?: string | null,
};

export type CreateAddressMutationVariables = {
  condition?: ModelAddressConditionInput | null,
  input: CreateAddressInput,
};

export type CreateAddressMutation = {
  createAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type CreateAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: CreateAdminInput,
};

export type CreateAdminMutation = {
  createAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type CreateBusMutationVariables = {
  condition?: ModelBusConditionInput | null,
  input: CreateBusInput,
};

export type CreateBusMutation = {
  createBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateBusForOrgMutationVariables = {
  busNumber: string,
};

export type CreateBusForOrgMutation = {
  createBusForOrg?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateExceptionMutationVariables = {
  condition?: ModelExceptionConditionInput | null,
  input: CreateExceptionInput,
};

export type CreateExceptionMutation = {
  createException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateOrgUserMutationVariables = {
  email: string,
  family_name: string,
  given_name: string,
  orgId: string,
};

export type CreateOrgUserMutation = {
  createOrgUser?:  {
    __typename: "CreateAdminOutput",
    User?:  {
      __typename: "CreateAdminOutputUser",
      Enabled: boolean,
      UserCreateDate: string,
      UserLastModifiedDate: string,
      UserStatus?: UserStatusType | null,
      Username: string,
    } | null,
  } | null,
};

export type CreateOrganizationMutationVariables = {
  condition?: ModelOrganizationConditionInput | null,
  input: CreateOrganizationInput,
};

export type CreateOrganizationMutation = {
  createOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateRiderMutationVariables = {
  condition?: ModelRiderConditionInput | null,
  input: CreateRiderInput,
};

export type CreateRiderMutation = {
  createRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type CreateRouteMutationVariables = {
  condition?: ModelRouteConditionInput | null,
  input: CreateRouteInput,
};

export type CreateRouteMutation = {
  createRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type CreateRouteActionMutationVariables = {
  condition?: ModelRouteActionConditionInput | null,
  input: CreateRouteActionInput,
};

export type CreateRouteActionMutation = {
  createRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type CreateScanMutationVariables = {
  condition?: ModelScanConditionInput | null,
  input: CreateScanInput,
};

export type CreateScanMutation = {
  createScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type CreateSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: CreateSchoolInput,
};

export type CreateSchoolMutation = {
  createSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type CreateSchoolHourMutationVariables = {
  condition?: ModelSchoolHourConditionInput | null,
  input: CreateSchoolHourInput,
};

export type CreateSchoolHourMutation = {
  createSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type CreateStopMutationVariables = {
  condition?: ModelStopConditionInput | null,
  input: CreateStopInput,
};

export type CreateStopMutation = {
  createStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteAddressMutationVariables = {
  condition?: ModelAddressConditionInput | null,
  input: DeleteAddressInput,
};

export type DeleteAddressMutation = {
  deleteAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: DeleteAdminInput,
};

export type DeleteAdminMutation = {
  deleteAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type DeleteBusMutationVariables = {
  condition?: ModelBusConditionInput | null,
  input: DeleteBusInput,
};

export type DeleteBusMutation = {
  deleteBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteExceptionMutationVariables = {
  condition?: ModelExceptionConditionInput | null,
  input: DeleteExceptionInput,
};

export type DeleteExceptionMutation = {
  deleteException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteOrganizationMutationVariables = {
  condition?: ModelOrganizationConditionInput | null,
  input: DeleteOrganizationInput,
};

export type DeleteOrganizationMutation = {
  deleteOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteRiderMutationVariables = {
  condition?: ModelRiderConditionInput | null,
  input: DeleteRiderInput,
};

export type DeleteRiderMutation = {
  deleteRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type DeleteRouteMutationVariables = {
  condition?: ModelRouteConditionInput | null,
  input: DeleteRouteInput,
};

export type DeleteRouteMutation = {
  deleteRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type DeleteRouteActionMutationVariables = {
  condition?: ModelRouteActionConditionInput | null,
  input: DeleteRouteActionInput,
};

export type DeleteRouteActionMutation = {
  deleteRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type DeleteScanMutationVariables = {
  condition?: ModelScanConditionInput | null,
  input: DeleteScanInput,
};

export type DeleteScanMutation = {
  deleteScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type DeleteSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: DeleteSchoolInput,
};

export type DeleteSchoolMutation = {
  deleteSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteSchoolHourMutationVariables = {
  condition?: ModelSchoolHourConditionInput | null,
  input: DeleteSchoolHourInput,
};

export type DeleteSchoolHourMutation = {
  deleteSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type DeleteStopMutationVariables = {
  condition?: ModelStopConditionInput | null,
  input: DeleteStopInput,
};

export type DeleteStopMutation = {
  deleteStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateAddressMutationVariables = {
  condition?: ModelAddressConditionInput | null,
  input: UpdateAddressInput,
};

export type UpdateAddressMutation = {
  updateAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdminMutationVariables = {
  condition?: ModelAdminConditionInput | null,
  input: UpdateAdminInput,
};

export type UpdateAdminMutation = {
  updateAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type UpdateBusMutationVariables = {
  condition?: ModelBusConditionInput | null,
  input: UpdateBusInput,
};

export type UpdateBusMutation = {
  updateBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateExceptionMutationVariables = {
  condition?: ModelExceptionConditionInput | null,
  input: UpdateExceptionInput,
};

export type UpdateExceptionMutation = {
  updateException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateOrganizationMutationVariables = {
  condition?: ModelOrganizationConditionInput | null,
  input: UpdateOrganizationInput,
};

export type UpdateOrganizationMutation = {
  updateOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateRiderMutationVariables = {
  condition?: ModelRiderConditionInput | null,
  input: UpdateRiderInput,
};

export type UpdateRiderMutation = {
  updateRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type UpdateRouteMutationVariables = {
  condition?: ModelRouteConditionInput | null,
  input: UpdateRouteInput,
};

export type UpdateRouteMutation = {
  updateRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type UpdateRouteActionMutationVariables = {
  condition?: ModelRouteActionConditionInput | null,
  input: UpdateRouteActionInput,
};

export type UpdateRouteActionMutation = {
  updateRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type UpdateScanMutationVariables = {
  condition?: ModelScanConditionInput | null,
  input: UpdateScanInput,
};

export type UpdateScanMutation = {
  updateScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type UpdateSchoolMutationVariables = {
  condition?: ModelSchoolConditionInput | null,
  input: UpdateSchoolInput,
};

export type UpdateSchoolMutation = {
  updateSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateSchoolHourMutationVariables = {
  condition?: ModelSchoolHourConditionInput | null,
  input: UpdateSchoolHourInput,
};

export type UpdateSchoolHourMutation = {
  updateSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type UpdateStopMutationVariables = {
  condition?: ModelStopConditionInput | null,
  input: UpdateStopInput,
};

export type UpdateStopMutation = {
  updateStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type ValidateAddressMutationVariables = {
  address: string,
};

export type ValidateAddressMutation = {
  validateAddress?:  {
    __typename: "ValidatedAddress",
    city: string,
    country: string,
    county: string,
    formatted: string,
    houseNumber: string,
    lat: string,
    lon: string,
    postcode: string,
    state: string,
    streetName: string,
  } | null,
};

export type OnCreateAddressSubscriptionVariables = {
  filter?: ModelSubscriptionAddressFilterInput | null,
};

export type OnCreateAddressSubscription = {
  onCreateAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnCreateAdminSubscription = {
  onCreateAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type OnCreateBusSubscriptionVariables = {
  filter?: ModelSubscriptionBusFilterInput | null,
};

export type OnCreateBusSubscription = {
  onCreateBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateExceptionSubscriptionVariables = {
  filter?: ModelSubscriptionExceptionFilterInput | null,
};

export type OnCreateExceptionSubscription = {
  onCreateException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
};

export type OnCreateOrganizationSubscription = {
  onCreateOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateRiderSubscriptionVariables = {
  filter?: ModelSubscriptionRiderFilterInput | null,
};

export type OnCreateRiderSubscription = {
  onCreateRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRouteSubscriptionVariables = {
  filter?: ModelSubscriptionRouteFilterInput | null,
};

export type OnCreateRouteSubscription = {
  onCreateRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRouteActionSubscriptionVariables = {
  filter?: ModelSubscriptionRouteActionFilterInput | null,
};

export type OnCreateRouteActionSubscription = {
  onCreateRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateScanSubscriptionVariables = {
  filter?: ModelSubscriptionScanFilterInput | null,
};

export type OnCreateScanSubscription = {
  onCreateScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnCreateSchoolSubscription = {
  onCreateSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateSchoolHourSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolHourFilterInput | null,
};

export type OnCreateSchoolHourSubscription = {
  onCreateSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStopSubscriptionVariables = {
  filter?: ModelSubscriptionStopFilterInput | null,
};

export type OnCreateStopSubscription = {
  onCreateStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteAddressSubscriptionVariables = {
  filter?: ModelSubscriptionAddressFilterInput | null,
};

export type OnDeleteAddressSubscription = {
  onDeleteAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnDeleteAdminSubscription = {
  onDeleteAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type OnDeleteBusSubscriptionVariables = {
  filter?: ModelSubscriptionBusFilterInput | null,
};

export type OnDeleteBusSubscription = {
  onDeleteBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteExceptionSubscriptionVariables = {
  filter?: ModelSubscriptionExceptionFilterInput | null,
};

export type OnDeleteExceptionSubscription = {
  onDeleteException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
};

export type OnDeleteOrganizationSubscription = {
  onDeleteOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteRiderSubscriptionVariables = {
  filter?: ModelSubscriptionRiderFilterInput | null,
};

export type OnDeleteRiderSubscription = {
  onDeleteRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRouteSubscriptionVariables = {
  filter?: ModelSubscriptionRouteFilterInput | null,
};

export type OnDeleteRouteSubscription = {
  onDeleteRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRouteActionSubscriptionVariables = {
  filter?: ModelSubscriptionRouteActionFilterInput | null,
};

export type OnDeleteRouteActionSubscription = {
  onDeleteRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteScanSubscriptionVariables = {
  filter?: ModelSubscriptionScanFilterInput | null,
};

export type OnDeleteScanSubscription = {
  onDeleteScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnDeleteSchoolSubscription = {
  onDeleteSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteSchoolHourSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolHourFilterInput | null,
};

export type OnDeleteSchoolHourSubscription = {
  onDeleteSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStopSubscriptionVariables = {
  filter?: ModelSubscriptionStopFilterInput | null,
};

export type OnDeleteStopSubscription = {
  onDeleteStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateAddressSubscriptionVariables = {
  filter?: ModelSubscriptionAddressFilterInput | null,
};

export type OnUpdateAddressSubscription = {
  onUpdateAddress?:  {
    __typename: "Address",
    city: string,
    country: string,
    county: string,
    createdAt: string,
    formatted: string,
    houseNumber: string,
    id: string,
    lat: string,
    lon: string,
    orgId: string,
    postcode: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId?: string | null,
    state: string,
    streetName: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnUpdateAdminSubscription = {
  onUpdateAdmin?:  {
    __typename: "Admin",
    createdAt: string,
    id: string,
    org?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    orgId: string,
    updatedAt: string,
    user?:  {
      __typename: "User",
      adminId?: string | null,
      createdAt: string,
      email?: string | null,
      firstName: string,
      id: string,
      lastName: string,
      orgId: string,
      stopId?: string | null,
      title?: string | null,
      updatedAt: string,
    } | null,
    userId: string,
  } | null,
};

export type OnUpdateBusSubscriptionVariables = {
  filter?: ModelSubscriptionBusFilterInput | null,
};

export type OnUpdateBusSubscription = {
  onUpdateBus?:  {
    __typename: "Bus",
    busNumber: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateExceptionSubscriptionVariables = {
  filter?: ModelSubscriptionExceptionFilterInput | null,
};

export type OnUpdateExceptionSubscription = {
  onUpdateException?:  {
    __typename: "Exception",
    authorized?: boolean | null,
    createdAt: string,
    date: string,
    dropoff: OverrideType,
    dropoffGuardianId?: string | null,
    dropoffStopId?: string | null,
    id: string,
    orgId: string,
    pickup: OverrideType,
    pickupGuardianId?: string | null,
    pickupStopId?: string | null,
    riderId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
};

export type OnUpdateOrganizationSubscription = {
  onUpdateOrganization?:  {
    __typename: "Organization",
    admins?:  {
      __typename: "ModelAdminConnection",
      nextToken?: string | null,
    } | null,
    buses?:  {
      __typename: "ModelBusConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    loginImageKey?: string | null,
    orgName: string,
    riders?:  {
      __typename: "ModelRiderConnection",
      nextToken?: string | null,
    } | null,
    routeActions?:  {
      __typename: "ModelRouteActionConnection",
      nextToken?: string | null,
    } | null,
    routes?:  {
      __typename: "ModelRouteConnection",
      nextToken?: string | null,
    } | null,
    schools?:  {
      __typename: "ModelSchoolConnection",
      nextToken?: string | null,
    } | null,
    stops?:  {
      __typename: "ModelStopConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
    users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateRiderSubscriptionVariables = {
  filter?: ModelSubscriptionRiderFilterInput | null,
};

export type OnUpdateRiderSubscription = {
  onUpdateRider?:  {
    __typename: "Rider",
    createdAt: string,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRouteSubscriptionVariables = {
  filter?: ModelSubscriptionRouteFilterInput | null,
};

export type OnUpdateRouteSubscription = {
  onUpdateRoute?:  {
    __typename: "Route",
    createdAt: string,
    id: string,
    isActive?: boolean | null,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riders: Array< string | null >,
    routeNumber: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRouteActionSubscriptionVariables = {
  filter?: ModelSubscriptionRouteActionFilterInput | null,
};

export type OnUpdateRouteActionSubscription = {
  onUpdateRouteAction?:  {
    __typename: "RouteAction",
    actionType: RouteActionTypes,
    createdAt: string,
    driverId: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateScanSubscriptionVariables = {
  filter?: ModelSubscriptionScanFilterInput | null,
};

export type OnUpdateScanSubscription = {
  onUpdateScan?:  {
    __typename: "Scan",
    createdAt: string,
    deviceLocationOnSubmit?:  {
      __typename: "Location",
      lat: string,
      lon: string,
    } | null,
    guardianIds?: Array< string | null > | null,
    id: string,
    manualScan?: boolean | null,
    orgId: string,
    riderIds: Array< string | null >,
    stopId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSchoolSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolFilterInput | null,
};

export type OnUpdateSchoolSubscription = {
  onUpdateSchool?:  {
    __typename: "School",
    SchoolHours?:  {
      __typename: "ModelSchoolHourConnection",
      nextToken?: string | null,
    } | null,
    address?:  {
      __typename: "Address",
      city: string,
      country: string,
      county: string,
      createdAt: string,
      formatted: string,
      houseNumber: string,
      id: string,
      lat: string,
      lon: string,
      orgId: string,
      postcode: string,
      schoolId?: string | null,
      state: string,
      streetName: string,
      updatedAt: string,
    } | null,
    addressId: string,
    createdAt: string,
    id: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds?: Array< string | null > | null,
    schoolName: string,
    stopIds?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateSchoolHourSubscriptionVariables = {
  filter?: ModelSubscriptionSchoolHourFilterInput | null,
};

export type OnUpdateSchoolHourSubscription = {
  onUpdateSchoolHour?:  {
    __typename: "SchoolHour",
    createdAt: string,
    dayName: string,
    endTime: string,
    id: string,
    school?:  {
      __typename: "School",
      addressId: string,
      createdAt: string,
      id: string,
      orgId: string,
      riderIds?: Array< string | null > | null,
      schoolName: string,
      stopIds?: Array< string | null > | null,
      updatedAt: string,
    } | null,
    schoolId: string,
    startTime: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStopSubscriptionVariables = {
  filter?: ModelSubscriptionStopFilterInput | null,
};

export type OnUpdateStopSubscription = {
  onUpdateStop?:  {
    __typename: "Stop",
    createdAt: string,
    id: string,
    name: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    riderIds: Array< string | null >,
    routeId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    admin?:  {
      __typename: "Admin",
      createdAt: string,
      id: string,
      orgId: string,
      updatedAt: string,
      userId: string,
    } | null,
    adminId?: string | null,
    createdAt: string,
    email?: string | null,
    firstName: string,
    id: string,
    lastName: string,
    orgId: string,
    organization?:  {
      __typename: "Organization",
      createdAt: string,
      id: string,
      loginImageKey?: string | null,
      orgName: string,
      updatedAt: string,
    } | null,
    stopId?: string | null,
    title?: string | null,
    updatedAt: string,
  } | null,
};
