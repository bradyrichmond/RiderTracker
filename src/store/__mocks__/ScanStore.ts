export const useScanStore = () => ({
    scans: [{
        id: 'e62fc50c-1829-4131-90ed-f48c06668e7c',
        deviceLocationOnSubmit: {
            lat: '44.123',
            lon: '-122.123'
        },
        manualScan: false,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riderIds: ['5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'],
        stopId: 'f849038d-e668-4620-b4d3-4f2ac538d53c'
    }],
    getScanById: async () => ({
        id: 'e62fc50c-1829-4131-90ed-f48c06668e7c',
        deviceLocationOnSubmit: {
            lat: '44.123',
            lon: '-122.123'
        },
        manualScan: false,
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riderIds: ['5cc9dfb8-0a4a-442f-ba0e-6dca8616853c'],
        stopId: 'f849038d-e668-4620-b4d3-4f2ac538d53c'
    }),
    updateScans: jest.fn()
})
