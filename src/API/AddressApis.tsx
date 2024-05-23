import { AddressType, GeoapifyValidateResponse } from '../types/AddressType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class AddressApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    async getAddresses(orgId: string): Promise<AddressType[]> {
        const addressesResponse = await this.client.organizationsOrgIdAddressesGet({ orgId })

        return handleApiResponse<AddressType[]>(addressesResponse)
    }

    async getAddressById(id: string): Promise<AddressType> {
        const addressResponse = await this.client.organizationsOrgIdAddressesIdGet({ id })

        return handleApiResponse<AddressType>(addressResponse)
    }

    async createAddress(orgId: string, body: AddressType): Promise<object> {
        const createAddressResponse = await this.client.organizationsOrgIdAddressesPost({ orgId }, body)

        return handleApiResponse<object>(createAddressResponse)
    }

    async deleteAddress(orgId: string, id: string): Promise<object> {
        const deleteAddressResponse = await this.client.organizationsOrgIdAddressesIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteAddressResponse)
    }

    async validateAddress(address: string): Promise<AddressType> {
        const validationResponse = await this.client.validateAddressPost({}, { address })

        const preEvaluationAddress: GeoapifyValidateResponse = handleApiResponse<GeoapifyValidateResponse>(validationResponse)
        const evaluated: AddressType = this._evaluateAddressData(preEvaluationAddress)
        return evaluated
    }

    async getBulkAddressesByIds(orgId: string, addressIds: string[]): Promise<AddressType[]> {
        const addressesResponse = await this.client.organizationsOrgIdAddressesBatchByIdPost({ orgId }, addressIds)

        return handleApiResponse<AddressType[]>(addressesResponse)
    }

    _evaluateAddressData(result: GeoapifyValidateResponse): AddressType {
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
                    }
                }
            } else {
                throw 'Address confidence is too low'
            }
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
