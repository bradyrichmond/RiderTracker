import { ScanType } from "../types/ScanType"
import { API_BASE_NAME } from "."

const getScans = async (token: string) => {
    try {
        const scansData = await fetch(`${API_BASE_NAME}/scans`, {
            headers: {
                'Authorization': token
            }
        })

        const scansJson = await scansData.json()
        const { scans } = scansJson

        return scans
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getScanById = async (token: string, id: string) => {
    try {
        const scanData = await fetch(`${API_BASE_NAME}/scans/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const scan = await scanData.json()

        return scan
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getScansForOrganization = async (token: string, organizationId: string) => {
    try {
        const scansData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/scans`, {
            headers: {
                'Authorization': token
            }
        })

        const scans = await scansData.json()

        return scans
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createScan = async (token: string, body: ScanType) => {
    try {
        const scansData = await fetch(`${API_BASE_NAME}/scans`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const scans = await scansData.json()

        return scans
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const deleteScan = async (token: string, id: string) => {
    try {
        const scansData = await fetch(`${API_BASE_NAME}/scans/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const scans = await scansData.json()

        return scans
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

export interface ScanApiFunctionTypes {
    getScans(token: string): Promise<ScanType[]>,
    getScanById(token: string, id: string): Promise<ScanType>,
    getScansForOrganization(token: string, organizationId: string): Promise<ScanType[]>,
    createScan(token: string, scan: ScanType): Promise<ScanType>,
    deleteScan(token: string, id: string): Promise<ScanType>
}

export default {
    getScans,
    getScanById,
    getScansForOrganization,
    createScan,
    deleteScan
}