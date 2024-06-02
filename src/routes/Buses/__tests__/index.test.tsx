import '@testing-library/jest-dom'
import Buses from '..'
import { render, screen, waitFor } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import { PropsWithChildren } from 'react'
jest.mock('@/API/BusApis')
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Buses Tests', () => {
  it('shows add bus button when authorized to add buses', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addBusButton = await screen.findByRole('button', {
        name: /addbus/i
      })
      expect(addBusButton).toBeInTheDocument()
    })
  })

  it('hides add bus button when not authorized to add buses', async () => {
    render(<Buses />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/addbus/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByText(/7888888888/i)).toBeInTheDocument()
    })
  })
})