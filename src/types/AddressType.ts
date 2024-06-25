import { LocationType } from './LocationType'

export interface AddressType {
    city: string
    country: string
    county: string
    formatted: string
    houseNumber: string
    id: string
    location: LocationType
    orgId: string
    postcode: string
    state: string
    streetName: string
}

export interface GeoapifyValidateResponse {
    body: {
        features: GeoapifyValidateResponseFeature[]
        query: GeoapifyValidateResponseQuery
        type: string
    },
    headers: Record<string,string>
    statusCode: string
}

interface GeoapifyValidateResponseFeature {
    bbox: number[]
    geometry: GeoapifyValidateResponseFeatureGeometry
    properties: GeoapifyValidateResponseFeatureProperties
    type: string
}

interface GeoapifyValidateResponseFeatureGeometry {
    coordinates: number[]
    type: string
}

interface GeoapifyValidateResponseFeatureProperties {
    address_line1: string
    address_line2: string
    category: string
    city: string
    country: string
    county: string
    country_code: string
    datasource: GeoapifyValidateResponseFeaturePropertiesDatasource
    formatted: string
    housenumber: string
    lat: number
    lon: number
    postcode: string
    place_id: string
    plus_code: string
    rank: GeoapifyValidateResponseFeatureRank
    result_type: string
    state: string
    state_code: string
    street: string
    suburb: string
    timezone: GeoapifyValidateResponseFeatureTimezone
}

interface GeoapifyValidateResponseFeaturePropertiesDatasource {
    attribution: string
    license: string
    sourcename: string
    url: URL
}

interface GeoapifyValidateResponseFeatureRank {
    confidence: number
    confidence_city_level: number
    confidence_street_level: number
    importance: number
    match_type: string
    popularity: number
}

interface GeoapifyValidateResponseFeatureTimezone {
    abbreviation_DST: string
    abbreviation_STD: string
    name: string
    offset_DST: string
    offset_DST_seconds: number
    offset_STD: string
    offset_STD_seconds: number
}

interface GeoapifyValidateResponseQuery {
    parsed: GeoapifyValidateResponseQueryParsed
    text: string
}

interface GeoapifyValidateResponseQueryParsed {
    city: string
    country: string
    expected_type: string
    housenumber: string
    postcode: string
    street: string
    state: string
}