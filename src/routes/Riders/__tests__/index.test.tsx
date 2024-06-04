import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import { PropsWithChildren } from 'react'
import RiderWrapper from '../RiderWrapper'
import Riders from '..'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Riders Tests', () => {
  it('shows add rider button when authorized to add riders', async () => {
    render(<RiderWrapper />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /addRider/i
      })).toBeInTheDocument()
    })
  })

  it('opens add rider modal when add rider button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<RiderWrapper />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addRiderButton = await screen.findByRole('button', {
        name: /addRider/i
      })

      await user.click(addRiderButton)
      const createRiderButton = await screen.findByRole('button', {
        name: /createRider/i
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
    render(<RiderWrapper />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/addRider/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<RiderWrapper />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /hallie/i
      })).toBeInTheDocument()
    })
  })

  it('opens the drawer when url path has an id', async () => {

    render(<Riders activeRider='123456' />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_OrgAdmin" /> })

    await waitFor(() => {
      screen.logTestingPlaygroundURL()
      expect(screen.getByLabelText('deleteRider')).toBeInTheDocument()
    })
  })
})