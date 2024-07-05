import '@testing-library/jest-dom'
import { Amplify } from 'aws-amplify'
import outputs from './amplify_outputs.json'

beforeEach(() => {
    Amplify.configure(outputs)
})

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (str: string) => str,
        i18n: {
            changeLanguage: Promise.resolve({})
        }
    })
}))

jest.mock('aws-amplify/auth', () => ({
    fetchAuthSession: () => ({
        userSub: '77463cae-8fcd-48c8-a526-a8997a4e167e',
        tokens: {
            accessToken: {
                'custom:orgId': '1cf1a2b2-30dd-43ea-b854-e6217073fe06'
            }
        }
    }),
    signUp: () => ({
        userId: 'newUserId'
    }),
    signOut: jest.fn()
}))

jest.mock('@/hooks/useDeviceLocation')

jest.mock('@/store/AddressStore')
jest.mock('@/store/ApiStore')
jest.mock('@/store/BusStore')
jest.mock('@/store/DriverStore')
jest.mock('@/store/ExceptionStore')
jest.mock('@/store/GuardianStore')
jest.mock('@/store/OrgStore')
jest.mock('@/store/RiderStore')
jest.mock('@/store/RouteActionStore')
jest.mock('@/store/RouteStore')
jest.mock('@/store/ScanStore')
jest.mock('@/store/SchoolStore')
jest.mock('@/store/StopStore')
jest.mock('@/store/UserStore')
