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
import StopsRiders from '../StopsRiders'
import { StopType } from '@/types/StopType'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

const stop: StopType = {
    "id": "a5641694-b188-4ec2-be57-b11a6e9bd1b5",
    "organizationId": "123456",
    "riderIds": ["123456"],
    "name": "Supportive Bear"
}

const stopWithoutRiderIds = {
    "id": "a5641694-b188-4ec2-be57-b11a6e9bd1b5",
    "organizationId": "123456",
    "riderIds": [],
    "name": "Supportive Bear"
}

const getStopData = async () => {

}

describe('StopsRiders Tests', () => {
    it('shows riders assigned to this stop', async () => {
        render(<StopsRiders stop={stop} getStopData={getStopData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const row = await screen.findByText(/tester/i)
            expect(row).toBeInTheDocument()
        })
    })

    it('shows no rows when there are no riders assigned to this stop', async () => {
        render(<StopsRiders stop={stopWithoutRiderIds} getStopData={getStopData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const row = await screen.findByText(/no rows/i)
            expect(row).toBeInTheDocument()
        })
    })

    it('hides assign rider to stop button for unauthorized users', async () => {
        render(<StopsRiders stop={stop} getStopData={getStopData} />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

        await waitFor(async () => {
            const assignRiderButton = screen.queryByText(/assign a rider to supportive bear/i)
            expect(assignRiderButton).not.toBeInTheDocument()
        })
    })

    it('shows assign rider button for authorized users', async () => {
        render(<StopsRiders stop={stop} getStopData={getStopData} />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const assignRiderButton = screen.queryByText(/assign a rider to supportive bear/i)
            expect(assignRiderButton).toBeInTheDocument()
        })
    })

    it('shows assign rider modal on button click', async () => {
        render(<StopsRiders stop={stop} getStopData={getStopData} />, { wrapper: ProviderWrapperAsRole })
        const user = userEvent.setup()

        await waitFor(async () => {
            const assignRiderButton = await screen.findByText(/assign a rider to supportive bear/i)
            expect(assignRiderButton).toBeInTheDocument()
            await user.click(assignRiderButton)
            const modalButton = await screen.findByText(/submit/i)
            expect(modalButton).toBeInTheDocument()
        })
    })

    it('closes assign rider modal on cancel click', async () => {
        render(<StopsRiders stop={stop} getStopData={getStopData} />, { wrapper: ProviderWrapperAsRole })
        const user = userEvent.setup()

        await waitFor(async () => {
            const assignRiderButton = screen.getByText(/assign a rider to supportive bear/i)
            expect(assignRiderButton).toBeInTheDocument()
            await user.click(assignRiderButton)
            const modalButton = await screen.findByText(/cancel/i)
            expect(modalButton).toBeInTheDocument()
            await user.click(modalButton)
            await waitForElementToBeRemoved(modalButton)
        })
    })
})