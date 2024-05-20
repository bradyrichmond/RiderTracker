export interface RiderType {
    id: string
    firstName: string
    lastName: string
    orgId: string
    schoolId: string
    stopIds: string[]
    guardianIds?: string[]
}