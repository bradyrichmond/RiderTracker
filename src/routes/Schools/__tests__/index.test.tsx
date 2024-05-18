import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Schools from '..'
import { PropsWithChildren } from 'react'
jest.mock('@/API/SchoolApis')
jest.mock('@/API/AddressApis')
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Schools Tests', () => {
  it('shows add school button when authorized to add schools', async () => {
    render(<Schools />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /add school/i
      })).toBeInTheDocument()
    })
  })

  it('opens add school modal when add school button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Schools />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addSchoolButton = await screen.findByRole('button', {
        name: /add school/i
      })

      await user.click(addSchoolButton)
      const createSchoolButton = await screen.findByRole('button', {
        name: /create school/i
      })
      expect(createSchoolButton).toBeInTheDocument()
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

  it('hides add school button when not authorized to add schools', async () => {
    render(<Schools />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/add school/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Schools />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /sunnyside elementary/i
      })).toBeInTheDocument()
    })
  })

  it('shows action buttons in the rows', async () => {
    render(<Schools />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteSchoolButtons = await screen.findAllByTestId('IndeterminateCheckBoxIcon')
      expect(deleteSchoolButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Schools />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" /> })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteSchoolButtons = screen.queryByTestId('IndeterminateCheckBoxIcon')
      expect(deleteSchoolButtons).not.toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Schools />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })
})