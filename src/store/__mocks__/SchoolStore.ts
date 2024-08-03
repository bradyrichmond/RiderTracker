export const useSchoolStore = () => ({
    updateSchools: jest.fn(),
    getSchoolById: async (id: string) => ({
        id,
        address: {
            formatted: '1600 Pennsylvania Ave Washington DC'
        },
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riders: [{
            id: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c',
            firstName: 'Randy',
            lastName: 'Rider',
            orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06'
        }],
        schoolName: 'Sunnyside Elementary'
    }),
    schools: [{
        id: '295234d5-63ee-4182-a92b-b7a9db5fe898',
        address: {
            formatted: '1600 Pennsylvania Ave Washington DC'
        },
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        riders: [{
            id: '5cc9dfb8-0a4a-442f-ba0e-6dca8616853c',
            firstName: 'Randy',
            lastName: 'Rider',
            orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06'
        }],
        schoolName: 'Sunnyside Elementary'
    }]
})
