import '@testing-library/jest-dom'

jest.mock('@/API/AddressApis')
jest.mock('@/API/AdminApis')
jest.mock('@/API/BusApis')
jest.mock('@/API/ExceptionApis')
jest.mock('@/API/OrganizationApis')
jest.mock('@/API/RiderApis')
jest.mock('@/API/RouteApis')
jest.mock('@/API/ScanApis')
jest.mock('@/API/SchoolApis')
jest.mock('@/API/StopApis')
jest.mock('@/API/UserApis')
jest.mock('@/helpers/GenerateApiGatewayClient')

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (str: string) => str,
        i18n: {
            changeLanguage: Promise.resolve({})
        }
    })
}))
