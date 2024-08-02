import '@testing-library/jest-dom'
import Buses from '..'
import { render, screen, waitFor } from '@testing-library/react'
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import { useUserStore } from '@/store/UserStore'
import { generateMockUserStore } from '@/helpers/GenerateMockUserStore'

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