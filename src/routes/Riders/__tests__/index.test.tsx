import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Riders from '..'
import { PropsWithChildren } from 'react'
jest.mock('@/API/RiderApis')
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Riders Tests', () => {
  it('shows add rider button when authorized to add riders', async () => {
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /add rider/i
      })).toBeInTheDocument()
    })
  })

  it('opens add rider modal when add rider button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addRiderButton = await screen.findByRole('button', {
        name: /add rider/i
      })

      await user.click(addRiderButton)
      const createRiderButton = await screen.findByRole('button', {
        name: /create rider/i
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
    render(<Riders />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/add rider/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /hallie/i
      })).toBeInTheDocument()
    })
  })

  it('shows action buttons in the rows', async () => {
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteRiderButtons = await screen.findAllByTestId('PersonRemoveIcon')
      expect(deleteRiderButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Riders />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteRiderButtons = screen.queryByTestId('PersonRemoveIcon')
      expect(deleteRiderButtons).not.toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Riders />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })
})