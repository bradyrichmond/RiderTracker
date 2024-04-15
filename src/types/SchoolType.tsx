import { AddressType } from "./AddressType"

export interface SchoolType {
    id: string
    schoolName: string
    organizationId: string
    address: string | AddressType,
    riders?: string[]
}