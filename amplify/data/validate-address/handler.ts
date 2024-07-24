import { env } from '$amplify/env/validate-address'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event: any) => {
    console.log(JSON.stringify(event))
    const { address } = event.arguments
    const baseVerificationUrl = _buildVerificationUrl(address)

    try {
        console.log(`Sending request: ${baseVerificationUrl}`)
        const apiResponse = await fetch(baseVerificationUrl)

        if (apiResponse && apiResponse.ok) {
            const responseJson = await apiResponse.json()
            console.log(JSON.stringify(responseJson))
            const transformedAddress = _evaluateAddressData(responseJson)
            console.log(JSON.stringify(transformedAddress))
            return transformedAddress
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
    return `https://api.geoapify.com/v1/geocode/search?text=${urlSafeAddress}&apiKey=${env.API_KEY}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _evaluateAddressData = (body: any) => {
    const ACCEPT_LEVEL = 0.75

    if (body.features.length === 0) {
        throw 'Address not found'
    } else {
        const place = body.features[0].properties
        console.log(JSON.stringify(place))
        if (place.rank.confidence > ACCEPT_LEVEL) {
            console.log('Confidence is high enough')
            const { housenumber, street, city, suburb, state, postcode, county, country, formatted, lon, lat } = place

            const newAddressObj = {
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

            console.log(`validatedAddress: ${JSON.stringify(newAddressObj)}`)

            return newAddressObj
        } else {
            throw 'Address confidence is too low'
        }
    }
}
