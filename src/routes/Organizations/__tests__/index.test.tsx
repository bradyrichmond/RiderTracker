import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react"
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
// @ts-ignore
import OrganizationApis from '@/API/OrganizationApis'
import Organizations from '..'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Organizations Tests', () => {
  it('loads rows into data grid when there is data', async () => {
    render(<Organizations />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /00492e30-ab34-44f6-9843-44f47f2cdf27/i
      })).toBeInTheDocument()
    })
  })

  it('shows action buttons in the rows', async () => {
    render(<Organizations />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId("InfoIcon")
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteDriverButtons = await screen.findAllByTestId("CancelIcon")
      expect(deleteDriverButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Organizations />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId("InfoIcon")
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteDriverButton = screen.queryByTestId("CancelIcon")
      expect(deleteDriverButton).not.toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Organizations />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })
})