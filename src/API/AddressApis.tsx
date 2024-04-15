import { AddressType } from "../types/AddressType"
import { API_BASE_NAME } from "."

const getAddresses = async (token: string) => {
    try {
        const addressesData = await fetch(`${API_BASE_NAME}/addresses`, {
            headers: {
                'Authorization': token
            }
        })

        const addressesJson = await addressesData.json()
        const { addresses } = addressesJson

        return addresses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getAddressById = async (token: string, id: string) => {
    try {
        const addressData = await fetch(`${API_BASE_NAME}/addresses/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const address = await addressData.json()

        return address
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getAddressesForOrganization = async (token: string, organizationId: string) => {
    try {
        const addressesData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/addresses`, {
            headers: {
                'Authorization': token
            }
        })

        const addresses = await addressesData.json()

        return addresses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createAddress = async (token: string, body: AddressType) => {
    try {
        const addressesData = await fetch(`${API_BASE_NAME}/addresses`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const addresses = await addressesData.json()

        return addresses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const deleteAddress = async (token: string, id: string) => {
    try {
        const addressesData = await fetch(`${API_BASE_NAME}/addresses/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const addresses = await addressesData.json()

        return addresses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const validateAddress = async (token: string, address: string) => {
    try {
        const validationData = await fetch(`${API_BASE_NAME}/addresses/validate`, {
            method: 'POST',
            body: JSON.stringify({ address }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const validation = await validationData.json()

        const result = evaluateAddressData(validation)

        return result
    } catch (e: any) {
        throw new Error(e)
    }
}

const evaluateAddressData = (result: any) => {
    const ACCEPT_LEVEL = 0.75;

    const { body } = result

    if (body.features.length === 0) {
        return false
    } else {
        const place = body.features[0].properties

        if (place.rank.confidence > ACCEPT_LEVEL) {
            const { housenumber, street, city, state, postcode, county, country, lat, lon, formatted } = place

            return { 
                houseNumber: housenumber, 
                street, 
                city, 
                state, 
                postcode, 
                county, 
                country, 
                location: {
                    lat,
                    lon
                }, 
                formatted
            }
        }
    }
}

export interface AddressApiFunctionTypes {
    getAddresses(token: string): Promise<AddressType[]>,
    getAddressById(token: string, id: string): Promise<AddressType>,
    getAddressesForOrganization(token: string, organizationId: string): Promise<AddressType[]>,
    createAddress(token: string, address: AddressType): Promise<AddressType>,
    validateAddress(token: string, address: string): Promise<any>,
    deleteAddress(token: string, id: string): Promise<AddressType>
}

export default {
    getAddresses,
    getAddressById,
    getAddressesForOrganization,
    createAddress,
    validateAddress,
    deleteAddress
}