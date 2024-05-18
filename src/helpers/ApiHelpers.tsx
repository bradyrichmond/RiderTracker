import { AddressType } from "@/types/AddressType"
import { BusType } from "@/types/BusType"
import { LocationType } from "@/types/LocationType"
import { OrganizationType } from "@/types/OrganizationType"
import { RiderType } from "@/types/RiderType"
import { ScanType } from "@/types/ScanType"
import { SchoolType } from "@/types/SchoolType"
import { UserType } from "@/types/UserType"

type ResponseDataTypes = AddressType | BusType | LocationType | OrganizationType | RiderType | ScanType | SchoolType | UserType

interface ApiResponse<T extends ResponseDataTypes | ResponseDataTypes[] | URL | object> {
    data: T
    status: number
    statusText: string
    headers: Record<string, unknown>
    config: Record<string, unknown>
}

export const handleApiResponse = <T extends ResponseDataTypes | ResponseDataTypes[] | URL | object>(response: ApiResponse<T>): T => {
    if (response.status === 200) {
        return response.data
    } else {
        throw `${response.status}: ${response.statusText}`
    }
}