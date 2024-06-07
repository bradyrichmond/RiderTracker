export interface SchoolType {
    id: string
    schoolName: string
    orgId: string
    address: string
    riderIds?: string[]
    createdBy: string
    createdDate: Date
    lastEditedBy: string
    lastEditDate: Date
}
