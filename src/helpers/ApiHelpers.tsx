import { UserType } from '@/store/UserStore'
import { AddressType, BusType, LocationType, OrganizationType, RiderType, ScanType, SchoolType } from '@/types/AmplifyTypes'


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