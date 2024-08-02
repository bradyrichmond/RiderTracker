import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import { PropsWithChildren } from 'react'
import Riders from '..'
import { useUserStore } from '@/store/UserStore'
import { generateMockUserStore } from '@/helpers/GenerateMockUserStore'

jest.mock('@/store/UserStore', () => ({
  useUserStore: jest.fn()
}))

const mockUseUserStore = useUserStore as unknown as jest.Mock

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Riders Tests', () => {
  it('shows add rider button when authorized to add riders', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /addRider/i
      })).toBeInTheDocument()
    })
  })

  it('opens add rider modal when add rider button clicked, and closes on cancel click', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))
    const user = userEvent.setup()
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addRiderButton = await screen.findByRole('button', {
        name: /addRider/i
      })

      await user.click(addRiderButton)
      const createRiderButton = await screen.findByRole('button', {
        name: /createRider/i
      })
      expect(createRiderButton).toBeInTheDocument()
    })

    await waitFor(async () => {
      const cancelButton = await screen.findByRole('button', {
        name: /cancel/i
      })
      expect(cancelButton).toBeInTheDocument()
      await user.click(cancelButton)
      await waitForElementToBeRemoved(cancelButton)
      const noMoreCancelButton = screen.queryByRole('button', {
        name: /cancel/i
      })
      expect(noMoreCancelButton).not.toBeInTheDocument()
    })
  })

  it('hides add rider button when not authorized to add riders', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: false, isDriver: false, isGuardian: true }))
    render(<Riders />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/addRider/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /randy/i
      })).toBeInTheDocument()
    })
  })

  it('opens the drawer when url path has an id', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))
    render(<Riders activeRider='5cc9dfb8-0a4a-442f-ba0e-6dca8616853c' />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_OrgAdmin" /> })

    await waitFor(() => {
      expect(screen.getByLabelText('deleteRider')).toBeInTheDocument()
    })
  })
})