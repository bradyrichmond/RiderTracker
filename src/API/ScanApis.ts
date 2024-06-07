import { ScanType } from '../types/ScanType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class ScanApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getScans = async (orgId: string) => {
        const getScansResponse = await this.client.organizationsOrgIdScansGet({ orgId })

        return handleApiResponse<ScanType[]>(getScansResponse)
    }

    getScanById = async (orgId: string, id: string) => {
        const getScanResponse = await this.client.organizationsOrgIdScansIdGet({ orgId, id })

        return handleApiResponse<ScanType>(getScanResponse)
    }

    createScan = async (orgId: string, body: ScanType) => {
        const createScanResponse = await this.client.organizationsOrgIdScansPost({ orgId }, body)

        return handleApiResponse<object>(createScanResponse)
    }

    deleteScan = async (orgId: string, id: string) => {
        const deleteScanResponse = await this.client.organizationsOrgIdScansIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteScanResponse)
    }
}

export interface ScanApiFunctionTypes {
    getScans(orgId: string): Promise<ScanType[]>,
    getScanById(orgId: string, id: string): Promise<ScanType>,
    createScan(orgId: string, scan: ScanType): Promise<object>,
    deleteScan(orgId: string, id: string): Promise<object>
}
