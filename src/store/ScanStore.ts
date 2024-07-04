import { ScanType } from '@/types/AmplifyTypes'
import { create } from 'zustand'

interface ScanStore {
    scans: ScanType[]
    updateScans(): Promise<void>
    createScan(newScan: ScanType): Promise<void>
    getScanById(scanId: string): Promise<ScanType>
}

export const useScanStore = create<ScanStore>((set) => ({
    scans: [],
    updateScans: async () => {
        set({ scans: [] })
    },
    getScanById: async () => {
        throw 'Failed to find scan by id'
    },
    createScan: async () => {
        throw 'failed to create scan because you didnt make the model....do you need it?'
    }
}))