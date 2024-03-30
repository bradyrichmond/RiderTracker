import { ScanType } from "../types/ScanType"
import { API_BASE_NAME } from "."

const getScans = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const scansData = await fetch(`${API_BASE_NAME}/scans`, {
            headers: {
                'Authorization': token
            }
        })

        const scans = await scansData.json()

        return scans
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const createScan = async (token: string, body: ScanType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

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
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const deleteScan = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

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
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export interface ScanApiFunctionTypes {
    getScans(token: string): Promise<ScanType[]>,
    createScan(token: string, scan: ScanType): Promise<ScanType>,
    deleteScan(token: string, id: string): Promise<ScanType>
}

export const ScanApis: ScanApiFunctionTypes =  {
    getScans,
    createScan,
    deleteScan
}