export interface ExceptionType {
    id: string
    orgId: string
    riderId: string
    date: Date
    pickupStopId?: string
    pickupGuardianId?: string
    dropoffStopId?: string
    dropoffGuardianId?: string
    createdBy: string
    createdDate: Date
    lastEditedBy: string
    lastEditDate: Date
}