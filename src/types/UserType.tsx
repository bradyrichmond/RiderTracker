export interface UserType {
    id: string
    orgId: string | string[]
    firstName: string
    lastName: string
    email: string
    title?: string
}

export interface GuardianType extends UserType {
    riderIds: string[]
}