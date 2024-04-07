import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Buses from '..'
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
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
      expect(screen.getByRole('button', {
        name: /add bus/i
      })).toBeInTheDocument()
    })
  })

  it('opens add bus modal when add bus button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addBusButton = await screen.findByRole('button', {
        name: /add bus/i
      })

      await user.click(addBusButton)
      const createBusButton = await screen.findByRole('button', {
        name: /create bus/i
      })
      expect(createBusButton).toBeInTheDocument()
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

  it('shows action buttons in the rows', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId("InfoIcon")
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteBusButtons = await screen.findAllByTestId("NoTransferIcon")
      expect(deleteBusButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Buses />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId("InfoIcon")
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteBusButtons = screen.queryByTestId("NoTransferIcon")
      expect(deleteBusButtons).not.toBeInTheDocument()
    })
  })

  it('shows no rows when there is no data to load', async () => {
    render(<Buses />, { wrapper: ProviderWrapperAsRole })

    await waitFor(() => {
      expect(screen.queryByText(/no rows/i)).toBeInTheDocument()
    })
  })
})