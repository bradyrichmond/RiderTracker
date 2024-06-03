import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Drivers from '..'
import { PropsWithChildren } from 'react'
jest.mock('@/API/UserApis')
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Drivers Tests', () => {
  it('shows add driver button when authorized to add drivers', async () => {
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /adddriver/i
      })).toBeInTheDocument()
    })
  })

  it('opens add driver modal when add driver button clicked, and closes on cancel click', async () => {
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
    render(<Drivers />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/adddriver/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      screen.logTestingPlaygroundURL()
      expect(screen.getByRole('gridcell', {
        name: /emily/i
      })).toBeInTheDocument()
    })
  })
})