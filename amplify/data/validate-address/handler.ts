import { secret } from '@aws-amplify/backend'
import { Schema } from '../resource'

export const handler = async (event: { address: string }) => {
    const baseVerificationUrl = _buildVerificationUrl(event.address)

    try {
        const apiResponse = await fetch(baseVerificationUrl)

        if (apiResponse) {
            if (apiResponse.ok) {
                const responseJson = await apiResponse.json()

                const transformedAddress = _evaluateAddressData(responseJson)

                return transformedAddress
            } else {
                throw 'api failure'
            }
        }
        else {
            throw 'api failure'
        }
    } catch (e) {
        const failure = {
            statusCode: 500,
            body: e
        }

        return failure
    }
}

const _buildVerificationUrl = (address: string) => {
    const urlSafeAddress = encodeURIComponent(address)
    return `https://api.geoapify.com/v1/geocode/search?text=${urlSafeAddress}&apiKey=${secret('geoapifyApiKey')}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _evaluateAddressData = (result: any): Partial<Schema['Address']['type']> => {
    const ACCEPT_LEVEL = 0.75

    const { body } = result

    if (body.features.length === 0) {
        throw 'Address not found'
    } else {
        const place = body.features[0].properties

        if (place.rank.confidence > ACCEPT_LEVEL) {
            const { housenumber, street, city, suburb, state, postcode, county, country, formatted, lon, lat } = place

            return {
                city: city ?? suburb,
                county,
                country,
                formatted,
                houseNumber: housenumber,
                lat,
                lon,
                postcode,
                state,
                streetName: street
            }
        } else {
            throw 'Address confidence is too low'
        }
    }
}
