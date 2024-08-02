import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Drivers from '..'
import { PropsWithChildren } from 'react'
import { useUserStore } from '@/store/UserStore'
import { generateMockUserStore } from '@/helpers/GenerateMockUserStore'

jest.mock('@/store/UserStore', () => ({
  useUserStore: jest.fn()
}))

const mockUseUserStore = useUserStore as unknown as jest.Mock

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Drivers Tests', () => {
  it('shows add driver button when authorized to add drivers', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))

    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /adddriver/i
      })).toBeInTheDocument()
    })
  })

  it('opens add driver modal when add driver button clicked, and closes on cancel click', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))

    const user = userEvent.setup()
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addDriverButton = await screen.findByRole('button', {
        name: /adddriver/i
      })

      await user.click(addDriverButton)
      const createDriverButton = await screen.findByRole('button', {
        name: /createdriver/i
      })
      expect(createDriverButton).toBeInTheDocument()
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

  it('hides add driver button when not authorized to add drivers', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: false, isDriver: false, isGuardian: true }))
    render(<Drivers />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/adddriver/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /emily/i
      })).toBeInTheDocument()
    })
  })
})