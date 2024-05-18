import { AddressType, GeoapifyValidateResponse } from "../types/AddressType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getAddresses = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addressesResponse = await client.organizationsOrgIdAddressesGet({ orgId })

    return handleApiResponse<AddressType[]>(addressesResponse)
}

const getAddressById = async (id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addressResponse = await client.organizationsOrgIdAddressesIdGet({ id })

    return handleApiResponse<AddressType>(addressResponse)
}

const createAddress = async (orgId: string, body: AddressType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createAddressResponse = await client.organizationsOrgIdAddressesPost({ orgId }, body)

    return handleApiResponse<object>(createAddressResponse)
}

const deleteAddress = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteAddressResponse = await client.organizationsOrgIdAddressesIdDelete({ orgId, id })

    return handleApiResponse<object>(deleteAddressResponse)
}

const validateAddress = async (address: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const validationResponse = await client.validateAddressPost({}, { address })

    const preEvaluationAddress: GeoapifyValidateResponse = handleApiResponse<GeoapifyValidateResponse>(validationResponse)
    const evaluated: AddressType = evaluateAddressData(preEvaluationAddress)
    return evaluated
}

const getBulkAddressesByIds = async (orgId: string, addressIds: string[]) => {
    const api = await RiderTrackerAPI.getClient()
    const addressesResponse = await api.client.organizationsOrgIdAddressesBatchByIdPost({ orgId }, addressIds)
    
    return handleApiResponse<AddressType[]>(addressesResponse)
}

const evaluateAddressData = (result: GeoapifyValidateResponse): AddressType => {
    const ACCEPT_LEVEL = 0.75;

    const { body } = result

    if (body.features.length === 0) {
        throw 'Address not found'
    } else {
        const place = body.features[0].properties

        if (place.rank.confidence > ACCEPT_LEVEL) {
            const { housenumber, street, city, suburb, state, postcode, county, country, lat, lon, formatted } = place

            return {
                id: 'temp',
                orgId: 'temp',
                houseNumber: housenumber,
                street,
                city: city ?? suburb,
                state,
                county,
                country,
                postcode,
                formatted,
                location: {
                    lat,
                    lon
                },
            }
        } else {
            throw 'Address confidence is too low'
        }
    }
}

export interface AddressApiFunctionTypes {
    getAddresses(orgId: string): Promise<AddressType[]>,
    getAddressById(id: string): Promise<AddressType>,
    createAddress(orgId: string, address: AddressType): Promise<object>,
    validateAddress(address: string): Promise<AddressType>,
    deleteAddress(orgId: string, id: string): Promise<object>,
    getBulkAddressesByIds(orgId: string, addressIds: string[]): Promise<AddressType[]>
}

export default {
    getAddresses,
    getAddressById,
    createAddress,
    validateAddress,
    deleteAddress,
    getBulkAddressesByIds
}