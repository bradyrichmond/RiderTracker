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
        name: /addschool/i
      })).toBeInTheDocument()
    })
  })

  it('opens add school modal when add school button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Schools />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addSchoolButton = await screen.findByRole('button', {
        name: /addschool/i
      })

      await user.click(addSchoolButton)
      const createSchoolButton = await screen.findByRole('button', {
        name: /createschool/i
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
    render(<Schools />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/addschool/i)).not.toBeInTheDocument()
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
})