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
        name: /add driver/i
      })).toBeInTheDocument()
    })
  })

  it('opens add driver modal when add driver button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addDriverButton = await screen.findByRole('button', {
        name: /add driver/i
      })

      await user.click(addDriverButton)
      const createDriverButton = await screen.findByRole('button', {
        name: /create driver/i
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
      expect(screen.queryByText(/add driver/i)).not.toBeInTheDocument()
    })
  })

  it('loads rows into data grid when there is data', async () => {
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.getByRole('gridcell', {
        name: /emily/i
      })).toBeInTheDocument()
    })
  })

  it('shows action buttons in the rows', async () => {
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteDriverButtons = await screen.findAllByTestId('PersonRemoveIcon')
      expect(deleteDriverButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Drivers />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteDriverButton = screen.queryByTestId('PersonRemoveIcon')
      expect(deleteDriverButton).not.toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })

  it('shows tooltips when action buttons are hovered', async () => {
    render(<Drivers />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
        const viewDetailButtons = await screen.findAllByTestId('InfoIcon')
        await userEvent.hover(viewDetailButtons[0])
        const viewDetailsTooltip = await screen.findByText(/view details/i)
        expect(viewDetailsTooltip).toBeInTheDocument()
    })

    await waitFor(async () => {
        const deleteDriverButtons = await screen.findAllByTestId('PersonRemoveIcon')
        await userEvent.hover(deleteDriverButtons[0])
        const deleteDriverTooltip = await screen.findByText(/delete driver/i)
        expect(deleteDriverTooltip).toBeInTheDocument()
    })
  })
})