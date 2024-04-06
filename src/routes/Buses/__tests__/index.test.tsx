import '@testing-library/jest-dom'
import Buses from '..'
import { render, screen, waitFor } from "@testing-library/react"
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
// @ts-ignore
import BusApis from '@/API/BusApis'
jest.mock('@/API/BusApis')
// @ts-ignore
import OrganizationApis from '@/API/OrganizationApis'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Buses Tests', () => {
  it('shows add bus button when authorized to add buses', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByText(/add bus/i)).toBeInTheDocument()
    })
  })

  it('hides add bus button when not authorized to add buses', async () => {
    render(<Buses />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

    await waitFor(() => {
      expect(screen.queryByText(/add bus/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /7888888888/i
      })).toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })
})