import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Guardians from '..'
import { PropsWithChildren } from 'react'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Guardians Tests', () => {
  it('shows add guardian button when authorized to add guardian', async () => {
    render(<Guardians />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /addguardian/i
      })).toBeInTheDocument()
    })
  })

  it('opens add guardian modal when add guardian button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Guardians />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addGuardianButton = await screen.findByRole('button', {
        name: /addguardian/i
      })

      await user.click(addGuardianButton)
      const createGuardianButton = await screen.findByRole('button', {
        name: /createguardian/i
      })
      expect(createGuardianButton).toBeInTheDocument()
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

  it('hides add guardian button when not authorized to add guardians', async () => {
    render(<Guardians />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(() => {
      expect(screen.queryByText(/addguardian/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Guardians />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /Trigger/i
      })).toBeInTheDocument()
    })
  })
})