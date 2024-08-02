import '@testing-library/jest-dom'
import Buses from '..'
import { render, screen, waitFor } from '@testing-library/react'
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
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
    getUsers: async () => {
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
    users: [{
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
    }],
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

describe('Buses Tests', () => {
  it('shows add bus button when authorized to add buses', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: true, isDriver: false, isGuardian: false }))

    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addBusButton = await screen.findByRole('button', {
        name: /addbus/i
      })
      expect(addBusButton).toBeInTheDocument()
    })
  })

  it('hides add bus button when not authorized to add buses', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: false, isDriver: false, isGuardian: true }))

    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/addbus/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    mockUseUserStore.mockReturnValue(generateMockUserStore({ isAdmin: false, isDriver: false, isGuardian: true }))

    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByText(/42/i)).toBeInTheDocument()
    })
  })
})