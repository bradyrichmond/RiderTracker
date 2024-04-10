import '@testing-library/jest-dom'
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import userEvent from '@testing-library/user-event'
import Stops from '..'
// @ts-ignore
import StopApis from '@/API/StopApis'
jest.mock('@/API/StopApis')
// @ts-ignore
import OrganizationApis from '@/API/OrganizationApis'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Stops Tests', () => {
  it('renders', async () => {
    render(<Stops />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const stopsHeader = await screen.findByText(/stops/i)
      expect(stopsHeader).toBeInTheDocument()
    })
  })

  it('populates datagrid when there are values', async () => {
    render(<Stops />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const row = await screen.findByText(/0c3dfca8-13eb-4df7-a194-883f0294d49b/i)
      expect(row).toBeInTheDocument()
    })
  })

  it('opens add stop modal when add stop button clicked, and closes on cancel click', async () => {
    const user = userEvent.setup()
    render(<Stops />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const addStopButton = await screen.findByRole('button', {
        name: /add stop/i
      })

      await user.click(addStopButton)
      const createStopButton = await screen.findByRole('button', {
        name: /create stop/i
      })
      expect(createStopButton).toBeInTheDocument()
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

  it('shows action buttons in the rows', async () => {
    render(<Stops />, { wrapper: ProviderWrapperAsRole })

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId("InfoIcon")
      expect(viewDetailButtons.length).toBeGreaterThan(0)
      const deleteScanButtons = await screen.findAllByTestId("WrongLocationIcon")
      expect(deleteScanButtons.length).toBeGreaterThan(0)
    })
  })

  it('hides the delete action buttons in the rows for unauthorized users', async () => {
    render(<Stops />, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} role="RiderTracker_Guardian" />})

    await waitFor(async () => {
      const viewDetailButtons = await screen.findAllByTestId("InfoIcon")
      expect(viewDetailButtons.length).toBeGreaterThan(0)
    })

    await waitFor(async () => {
      const deleteScanButtons = screen.queryByTestId("WrongLocationIcon")
      expect(deleteScanButtons).not.toBeInTheDocument()
    })
  })
})