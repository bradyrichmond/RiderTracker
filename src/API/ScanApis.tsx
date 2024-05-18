import { ScanType } from "../types/ScanType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getScans = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getScansResponse = await client.organizationsOrgIdRidersPost({ orgId })

    return handleApiResponse<ScanType[]>(getScansResponse)
}

const getScanById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getScanResponse = await client.organizationsOrgIdScansIdGet({ orgId, id })

    return handleApiResponse<ScanType>(getScanResponse)
}

const createScan = async (orgId: string, body: ScanType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createScanResponse = await client.organizationsOrgIdScansPost({ orgId }, body)

    return handleApiResponse<object>(createScanResponse)
}

const deleteScan = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteScanResponse = await client.organizationsOrgIdScansIdDelete({ orgId, id })

    return handleApiResponse<object>(deleteScanResponse)
}

export interface ScanApiFunctionTypes {
    getScans(orgId: string): Promise<ScanType[]>,
    getScanById(orgId: string, id: string): Promise<ScanType>,
    createScan(orgId: string, scan: ScanType): Promise<object>,
    deleteScan(orgId: string, id: string): Promise<object>
}

export default {
    getScans,
    getScanById,
    createScan,
    deleteScan
}