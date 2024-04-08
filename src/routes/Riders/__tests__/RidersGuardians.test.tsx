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
import RidersGuardians from '../RidersGuardians'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

const rider = {
    "id": "123456",
    "firstName": "Hallie",
    "lastName": "James",
    "organizationId": "123",
    "guardianRiderLinks": [
        "123456"
    ]
}

const riderWithoutGuardianLinks = {
    "id": "123456",
    "firstName": "Hallie",
    "lastName": "James",
    "organizationId": "123",
    "guardianRiderLinks": []
}

const getRiderData = async () => {

}

describe('Guardians Tests', () => {
    it('shows riders connected to this guardian', async () => {
        render(<RidersGuardians rider={rider} getRiderData={getRiderData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const row = await screen.findByText(/other/i)
            expect(row).toBeInTheDocument()
        })
    })

    it('shows no rows when there are no riders connected to this guardian', async () => {
        render(<RidersGuardians rider={riderWithoutGuardianLinks} getRiderData={getRiderData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const row = await screen.findByText(/no rows/i)
            expect(row).toBeInTheDocument()
        })
    })

    it('hides link rider to guardian button for unauthorized users', async () => {
        render(<RidersGuardians rider={rider} getRiderData={getRiderData} />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

        await waitFor(async () => {
            const linkGuardianButton = screen.queryByText(/link another guardian to this rider/i)
            expect(linkGuardianButton).not.toBeInTheDocument()
        })
    })

    it('shows link rider to guardian button for authorized users', async () => {
        render(<RidersGuardians rider={rider} getRiderData={getRiderData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const linkGuardianButton = screen.queryByText(/link another guardian to this rider/i)
            expect(linkGuardianButton).toBeInTheDocument()
        })
    })

    it('shows link rider to guardian modal on button click', async () => {
        render(<RidersGuardians rider={rider} getRiderData={getRiderData} />, { wrapper: ProviderWrapperAsRole })
        const user = userEvent.setup()

        await waitFor(async () => {
            const linkGuardianButton = screen.getByText(/link another guardian to this rider/i)
            expect(linkGuardianButton).toBeInTheDocument()
            await user.click(linkGuardianButton)
            const modalButton = await screen.findByText(/create link/i)
            expect(modalButton).toBeInTheDocument()
        })
    })

    it('closes link rider to guardian modal on cancel click', async () => {
        render(<RidersGuardians rider={rider} getRiderData={getRiderData} />, { wrapper: ProviderWrapperAsRole })
        const user = userEvent.setup()

        await waitFor(async () => {
            const linkGuardianButton = screen.getByText(/link another guardian to this rider/i)
            expect(linkGuardianButton).toBeInTheDocument()
            await user.click(linkGuardianButton)
            const modalButton = await screen.findByText(/cancel/i)
            expect(modalButton).toBeInTheDocument()
            await user.click(modalButton)
            await waitForElementToBeRemoved(modalButton)
        })
    })
})