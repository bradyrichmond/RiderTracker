export interface OrganizationType {
    id: string
    orgName: string
    orgSlug: string
    loginImageKey?: string
    adminIds?: string[]
    driverIds?: string[]
    guardianIds?: string[]
}