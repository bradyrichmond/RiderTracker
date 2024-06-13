export interface SchoolType {
    address: string
    createdBy: string
    createdDate: number
    hours: SchoolHourType[]
    id: string
    lastEditedBy: string
    lastEditDate: number
    orgId: string
    riderIds?: string[]
    schoolName: string
}

export interface SchoolHourType {
    dayName: string
    endTime: string
    startTime: string
}
