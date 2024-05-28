export interface UserType {
    id: string
    orgId: string
    firstName: string
    lastName: string
    email: string
    title?: string
    profileImageKey?: string
}

export interface GuardianType extends UserType {
    riderIds: string[]
}