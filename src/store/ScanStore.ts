import { ScanType } from '@/types/ScanType'
import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface ScanStore {
    scans: ScanType[]
    updateScans(): Promise<void>
    createScan(newScan: ScanType): Promise<void>
    getScanById(scanId: string): Promise<ScanType>
}

export const useScanStore = create<ScanStore>((set, get) => ({
    scans: [],
    updateScans: async () => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const scans = await api?.scans.getScans(orgId)

        set({ scans })
    },
    getScanById: async (scanId: string) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        const scan = await api?.scans.getScanById(orgId, scanId)

        if (scan) {
            return scan
        }

        throw 'Failed to find scan by id'
    },
    createScan: async (newScan: ScanType) => {
        const api = useApiStore.getState().api
        const orgId = useOrgStore.getState().orgId

        await api?.scans.createScan(orgId, newScan)
        await get().updateScans()
    }
}))