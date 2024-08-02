import { Schema } from '../../amplify/data/resource'

// Types
export type AddressType = Schema['Address']['type']
export type CreateAddressTypeInput = Schema['Address']['createType']
export type DeleteAddressTypeInput = Schema['Address']['deleteType']
export type UpdateAddressTypeInput = Schema['Address']['updateType']

export type BusType = Schema['Bus']['type']
export type CreateBusTypeInput = Schema['Bus']['createType']
export type DeleteBusTypeInput = Schema['Bus']['deleteType']
export type UpdateBusTypeInput = Schema['Bus']['updateType']

export type ExceptionType = Schema['Exception']['type']
export type CreateExceptionTypeInput = Schema['Exception']['createType']
export type DeleteExceptionTypeInput = Schema['Exception']['deleteType']
export type UpdateExceptionTypeInput = Schema['Exception']['updateType']

export type LocationType = Schema['Location']['type']

export type OrganizationType = Schema['Organization']['type']
export type CreateOrganizationTypeInput = Schema['Organization']['createType']
export type DeleteOrganizationTypeInput = Schema['Organization']['deleteType']
export type UpdateOrganizationTypeInput = Schema['Organization']['updateType']

export type RiderType = Schema['Rider']['type']
export type CreateRiderTypeInput = Schema['Rider']['createType']
export type DeleteRiderTypeInput = Schema['Rider']['deleteType']
export type UpdateRiderTypeInput = Schema['Rider']['updateType']

export type RouteActionType = Schema['RouteAction']['type']
export type CreateRouteActionTypeInput = Schema['RouteAction']['createType']
export type DeleteRouteActionTypeInput = Schema['RouteAction']['deleteType']
export type UpdateRouteActionTypeInput = Schema['RouteAction']['updateType']

export type RouteType = Schema['Route']['type']
export type CreateRouteTypeInput = Schema['Route']['createType']
export type DeleteRouteTypeInput = Schema['Route']['deleteType']
export type UpdateRouteTypeInput = Schema['Route']['updateType']

export type SchoolType = Schema['School']['type']
export type CreateSchoolTypeInput = Schema['School']['createType']
export type CreateSchoolInput = { school: CreateSchoolTypeInput, address: string }
export type DeleteSchoolTypeInput = Schema['School']['deleteType']
export type UpdateSchoolTypeInput = Schema['School']['updateType']

export type SchoolHourType = Schema['SchoolHour']['type']
export type CreateSchoolHourTypeInput = Schema['SchoolHour']['createType']
export type DeleteSchoolHourTypeInput = Schema['SchoolHour']['deleteType']
export type UpdateSchoolHourTypeInput = Schema['SchoolHour']['updateType']

export type StopType = Schema['Stop']['type']
export type CreateStopTypeInput = Schema['Stop']['createType']
export type DeleteStopTypeInput = Schema['Stop']['deleteType']
export type UpdateStopTypeInput = Schema['Stop']['updateType']

export type UserType = Schema['User']['type']
export type CreateUserTypeInput = Schema['User']['createType']
export type DeleteUserTypeInput = Schema['User']['deleteType']
export type UpdateUserTypeInput = Schema['Bus']['updateType']

// Enum
export enum DeliveryMediumType {
    EMAIL = 'EMAIL',
    SMS = 'SMS'
}

export enum OverrideType {
    OVERRIDE = 'OVERRIDE',
    NO_CHANGE = 'NO_CHANGE',
    CANCEL = 'CANCEL'
}

export enum RouteActionTypes {
    ROUTE_START = 'ROUTE_START',
    ROUTE_END = 'ROUTE_END',
    ROUTE_SCAN = 'ROUTE_SCAN'
}

export enum UserStatusType {
    ARCHIVED = 'ARCHIVED',
    COMPROMISED = 'COMPROMISED',
    CONFIRMED = 'CONFIRMED',
    EXTERNAL_PROVIDER = 'EXTERNAL_PROVIDER',
    FORCE_CHANGE_PASSWORD = 'FORCE_CHANGE_PASSWORD',
    RESET_REQUIRED = 'RESET_REQUIRED',
    UNCONFIRMED = 'UNCONFIRMED',
    UNKNOWN = 'UNKNOWN'
}
