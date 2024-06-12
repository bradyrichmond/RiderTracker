export interface ExceptionType {
    id: string
    orgId: string
    riderId: string
    date: number
    pickupStopId?: string
    pickupGuardianId?: string
    dropoffStopId?: string
    dropoffGuardianId?: string
    pickup: string
    dropoff: string
    createdBy: string
    createdDate: number
    lastEditedBy: string
    lastEditDate: number
    type: ExceptionTypeType
}

export enum ExceptionTypeType {
    AUTHORIZED = 'authorized',
    UNAUTHORIZED = 'unauthorized'
}