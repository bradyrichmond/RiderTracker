export const useSchoolStore = () => ({
    getSchools: async () => [{
        schoolId: 'cfb71ffb-95a1-4921-8483-5179ab1b1538',
        addressId: '147c4858-fb9a-409b-9343-294eb389c982',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riderIds: [],
        schoolName: 'Sunnyside Elementary',
        stopIds: []
    }],
    getSchoolById: async (schoolId: string) => ({
        schoolId,
        addressId: '147c4858-fb9a-409b-9343-294eb389c982',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riderIds: [],
        schoolName: 'Sunnyside Elementary',
        stopIds: []
    }),
    schools: []
})
