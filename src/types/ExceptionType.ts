export interface ExceptionType {
    createdBy: string
    createdAt: number
    date: number
    dropoff: string
    dropoffStopId?: string
    dropoffGuardianId?: string
    id: string
    updatedAt: number
    updatedBy: string
    orgId: string
    pickupStopId?: string
    pickupGuardianId?: string
    pickup: string
    riderId: string
    type: ExceptionTypeType
}

export enum ExceptionTypeType {
    AUTHORIZED = 'authorized',
    UNAUTHORIZED = 'unauthorized'
}