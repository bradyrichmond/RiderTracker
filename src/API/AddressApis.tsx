import { AddressType } from "../types/AddressType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getAddresses = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addressesResponse = await client.organizationsOrgIdAddressesGet({ orgId })

    return handleApiResponse(addressesResponse)
}

const getAddressById = async (id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const addressResponse = await client.organizationsOrgIdAddressesIdGet({ id })

    return handleApiResponse(addressResponse)
}

const createAddress = async (orgId: string, body: AddressType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createAddressResponse = await client.organizationsOrgIdAddressesPost({ orgId }, body)

    return handleApiResponse(createAddressResponse)
}

const deleteAddress = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteAddressResponse = await client.organizationsOrgIdAddressesIdDelete({ orgId, id })

    return handleApiResponse(deleteAddressResponse)
}

const validateAddress = async (address: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const validationResponse = await client.validateAddressPost({}, { address })

    const preEvaluationAddress = handleApiResponse(validationResponse)
    const evaluated = evaluateAddressData(preEvaluationAddress)
    return evaluated
}

const getBulkAddressesByIds = async (orgId: string, addressIds: string[]) => {
    const api = await RiderTrackerAPI.getClient()
    const usersResponse = await api.client.organizationsOrgIdAddressesBatchByIdPost({ orgId }, addressIds)
    
    return handleApiResponse(usersResponse)
}

const evaluateAddressData = (result: any) => {
    const ACCEPT_LEVEL = 0.75;

    const { body } = result

    if (body.features.length === 0) {
        return false
    } else {
        const place = body.features[0].properties

        if (place.rank.confidence > ACCEPT_LEVEL) {
            const { housenumber, street, suburb, state, postcode, county, country, lat, lon, formatted } = place

            return {
                houseNumber: housenumber,
                street,
                city: suburb,
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
    getAddresses(orgId: string): Promise<AddressType[]>,
    getAddressById(id: string): Promise<AddressType>,
    createAddress(orgId: string, address: AddressType): Promise<any>,
    validateAddress(address: string): Promise<any>,
    deleteAddress(orgId: string, id: string): Promise<void>,
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