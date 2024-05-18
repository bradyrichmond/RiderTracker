import { LocationType } from './LocationType'

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

export interface GeoapifyValidateResponse {
    body: {
        type: string
        features: GeoapifyValidateResponseFeature[]
        query: GeoapifyValidateResponseQuery
    },
    statusCode: string,
    headers: Record<string,string>
}

interface GeoapifyValidateResponseFeature {
    type: string
    properties: GeoapifyValidateResponseFeatureProperties
    geometry: GeoapifyValidateResponseFeatureGeometry
    bbox: number[]
}

interface GeoapifyValidateResponseFeatureGeometry {
    type: string,
    coordinates: number[]
}

interface GeoapifyValidateResponseFeatureProperties {
    datasource: GeoapifyValidateResponseFeaturePropertiesDatasource
    housenumber: string
    street: string
    suburb: string
    city: string
    county: string
    state: string
    postcode: string
    country: string
    country_code: string
    lon: number
    lat: number
    formatted: string
    address_line1: string
    address_line2: string
    state_code: string
    result_type: string
    rank: GeoapifyValidateResponseFeatureRank
    timezone: GeoapifyValidateResponseFeatureTimezone
    place_id: string
    category: string
    plus_code: string
}

interface GeoapifyValidateResponseFeaturePropertiesDatasource {
    sourcename: string
    attribution: string
    license: string
    url: URL
}

interface GeoapifyValidateResponseFeatureRank {
    importance: number
    popularity: number
    confidence: number
    confidence_city_level: number
    confidence_street_level: number
    match_type: string
}

interface GeoapifyValidateResponseFeatureTimezone {
    name: string
    offset_STD: string
    offset_STD_seconds: number
    offset_DST: string
    offset_DST_seconds: number
    abbreviation_STD: string
    abbreviation_DST: string
}

interface GeoapifyValidateResponseQuery {
    text: string
    parsed: GeoapifyValidateResponseQueryParsed
}

interface GeoapifyValidateResponseQueryParsed {
    housenumber: string
    street: string
    postcode: string
    city: string
    state: string
    country: string
    expected_type: string
}