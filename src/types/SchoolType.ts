import { AddressType } from './AddressType'
import { RiderType } from './RiderType'

export interface SchoolType {
    addressId: string
    address?: AddressType
    createdAt: number
    createdBy: string
    hours?: SchoolHourType[]
    id: string
    orgId: string
    riderIds?: string[]
    riders?: RiderType[]
    schoolName: string
    updatedAt: number
    updatedBy: string
}

export interface SchoolHourType {
    dayName: string
    endTime: string
    startTime: string
}
