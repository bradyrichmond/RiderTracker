import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Drivers from '..'
import { PropsWithChildren } from 'react'
import { useUserStore } from '@/store/UserStore'

const generateMockUserStore = (config: { isAdmin: boolean, isDriver: boolean, isGuardian: boolean }) => {
  const { isAdmin, isDriver, isGuardian } = config

  return {
    currentUser: {
      id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
      email: 'eeeemail@ridertracker.com',
      firstName: 'User',
      isAdmin,
      isDriver,
      isGuardian,
      lastName: 'Name',
      orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
      title: null,
      createdAt: '2024-08-02T18:23:55.234Z',
      updatedAt: '2024-08-02T18:23:55.234Z'
    },
    updateUsers: async () => {
      return [
        {
          id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
          email: 'eeeemail@ridertracker.com',
          firstName: 'User',
          isAdmin: null,
          isDriver: null,
          isGuardian: null,
          lastName: 'Name',
          orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
          title: null,
          createdAt: '2024-08-02T18:23:55.234Z',
          updatedAt: '2024-08-02T18:23:55.234Z'
        }
      ]
    },
    users: [
      {
        id: '88f1f380-b0d1-70ce-de47-0cf24f97e0e5',
        email: 'eeeemail@ridertracker.com',
        firstName: 'User',
        isAdmin,
        isDriver,
        isGuardian,
        lastName: 'Name',
        orgId: 'e435c34e-d0a2-4906-93f5-54fd8fe478bc',
        title: null,
        createdAt: '2024-08-02T18:23:55.234Z',
        updatedAt: '2024-08-02T18:23:55.234Z'
      },
      {
        id: '440f2538-3b5a-4488-99ce-69b332025a9a',
        email: 'EmilyDriver@ridertracker.com',
        firstName: 'Emily',
        isAdmin: null,
        isDriver: true,
        isGuardian: null,
        lastName: 'Driver',
        orgId: '1cf1a2b2-30dd-43ea-b854-e6217073fe06',
        title: null,
        createdAt: '2024-08-02T18:23:55.234Z',
        updatedAt: '2024-08-02T18:23:55.234Z'
      }
    ],
    signOutAws: jest.fn(),
    updateUserData: jest.fn()
  }
}

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