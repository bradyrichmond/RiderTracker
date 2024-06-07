import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'
import { ExceptionType } from '@/types/ExceptionType'

export class ExceptionApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getExceptions = async (orgId: string): Promise<ExceptionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdExceptionsGet({ orgId })

        return handleApiResponse<ExceptionType[]>(exceptionsResponse)
    }

    getExceptionById = async (orgId: string, id: string): Promise<ExceptionType> => {
        const addressResponse = await this.client.organizationsOrgIdExceptionsIdGet({ orgId, id })

        return handleApiResponse<ExceptionType>(addressResponse)
    }

    createException = async (orgId: string, body: ExceptionType): Promise<object> => {
        const createExceptionResponse = await this.client.organizationsOrgIdExceptionsPost({ orgId }, body)

        return handleApiResponse<object>(createExceptionResponse)
    }

    deleteException = async (orgId: string, id: string): Promise<object> => {
        const deleteExceptionResponse = await this.client.organizationsOrgIdExceptionsIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteExceptionResponse)
    }
}

export interface ExceptionApiFunctionTypes {
    getExceptions(orgId: string): Promise<ExceptionType[]>,
    getExceptionById(orgId: string, id: string): Promise<ExceptionType>,
    createException(orgId: string, address: ExceptionType): Promise<object>,
    deleteException(orgId: string, id: string): Promise<object>
}
