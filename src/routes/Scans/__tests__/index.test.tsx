import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Scans from '..'
import { PropsWithChildren } from 'react'
jest.mock('@/API/ScanApis')
jest.mock('@/API/RiderApis')
jest.mock('@/API/UserApis')
jest.mock('@/API/OrganizationApis')
jest.mock('@/hooks/useDeviceLocation')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Scans Tests', () => {
  it('shows add scan button when authorized to add scans', async () => {
    render(<Scans />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /add scan/i
      })).toBeInTheDocument()
    })
  })

  it('opens add scan modal when add scan button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Scans />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addScanButton = await screen.findByRole('button', {
        name: /add scan/i
      })

      await user.click(addScanButton)
      const createScanButton = await screen.findByRole('button', {
        name: /create scan/i
      })
      expect(createScanButton).toBeInTheDocument()
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

  it('hides add scan button when not authorized to add scans', async () => {
    render(<Scans />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/add scan/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Scans />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /ec427081-7a41-4248-88ed-9ea7b1a3341f/i
      })).toBeInTheDocument()
    })
  })

  it('shows action buttons in the rows', async () => {
    render(<Scans />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteScanButtons = await screen.findAllByTestId('PlaylistRemoveIcon')
      expect(deleteScanButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Scans />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteScanButtons = screen.queryByTestId('PlaylistRemoveIcon')
      expect(deleteScanButtons).not.toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Scans />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })
})