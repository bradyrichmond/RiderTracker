import '@testing-library/jest-dom'
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import userEvent from '@testing-library/user-event'
// @ts-ignore
import GuardianApis from '@/API/GuardianApis'
jest.mock('@/API/GuardianApis')
// @ts-ignore
import RiderApis from '@/API/RiderApis'
jest.mock('@/API/RiderApis')
// @ts-ignore
import OrganizationApis from '@/API/OrganizationApis'
import GuardiansRiders from '../GuardiansRiders'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

const guardian = {
    "id": "123",
    "firstName": "Parental",
    "lastName": "Guardian",
    "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
    "guardianRiderLinks": [
        "123456"
    ]
}

const guardianWithoutRiderLinks = {
    "id": "123",
    "firstName": "Parental",
    "lastName": "Guardian",
    "organizationId": "00492e30-ab34-44f6-9843-44f47f2cdf27",
    "guardianRiderLinks": []
}

const getGuardianData = async () => {

}

describe('Guardians Tests', () => {
    it('shows riders connected to this guardian', async () => {
        render(<GuardiansRiders guardian={guardian} getGuardianData={getGuardianData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const row = await screen.findByText(/tester/i)
            expect(row).toBeInTheDocument()
        })
    })

    it('shows no rows when there are no riders connected to this guardian', async () => {
        render(<GuardiansRiders guardian={guardianWithoutRiderLinks} getGuardianData={getGuardianData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const row = await screen.findByText(/no rows/i)
            expect(row).toBeInTheDocument()
        })
    })

    it('hides link rider to guardian button for unauthorized users', async () => {
        render(<GuardiansRiders guardian={guardian} getGuardianData={getGuardianData} />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

        await waitFor(async () => {
            const linkRiderButton = screen.queryByText(/link another rider to this guardian/i)
            expect(linkRiderButton).not.toBeInTheDocument()
        })
    })

    it('shows link rider to guardian button for authorized users', async () => {
        render(<GuardiansRiders guardian={guardian} getGuardianData={getGuardianData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const linkRiderButton = screen.queryByText(/link another rider to this guardian/i)
            expect(linkRiderButton).toBeInTheDocument()
        })
    })

    it('shows link rider to guardian modal on button click', async () => {
        render(<GuardiansRiders guardian={guardian} getGuardianData={getGuardianData} />, { wrapper: ProviderWrapperAsRole })
        const user = userEvent.setup()

        await waitFor(async () => {
            const linkRiderButton = screen.getByText(/link another rider to this guardian/i)
            expect(linkRiderButton).toBeInTheDocument()
            await user.click(linkRiderButton)
            const modalButton = await screen.findByText(/create link/i)
            expect(modalButton).toBeInTheDocument()
        })
    })

    it('closes link rider to guardian modal on cancel click', async () => {
        render(<GuardiansRiders guardian={guardian} getGuardianData={getGuardianData} />, { wrapper: ProviderWrapperAsRole })
        const user = userEvent.setup()

        await waitFor(async () => {
            const linkRiderButton = screen.getByText(/link another rider to this guardian/i)
            expect(linkRiderButton).toBeInTheDocument()
            await user.click(linkRiderButton)
            const modalButton = await screen.findByText(/cancel/i)
            expect(modalButton).toBeInTheDocument()
            await user.click(modalButton)
            await waitForElementToBeRemoved(modalButton)
        })
    })
})