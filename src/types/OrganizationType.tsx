export interface OrganizationType {
    id: string
    orgName: string
    loginImageKey?: string
    adminIds?: string[]
    driverIds?: string[]
    guardianIds?: string[]
}