import { LocationType } from "./LocationType"

export interface AddressType {
    id: string
    orgId: string
    houseNumber: string
    street: string
    city: string
    state: string
    county: string
    country: string
    postcode: string
    formatted: string
    location: LocationType
}
