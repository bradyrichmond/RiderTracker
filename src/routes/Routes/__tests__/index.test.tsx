import '@testing-library/jest-dom'
import { render, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Routes from '..'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import userEvent from '@testing-library/user-event'
import { PropsWithChildren } from 'react'

afterEach(() => {
    jest.restoreAllMocks()
})

describe('Routes Tests', () => {
    it('shows add route button when authorized to add routes', async () => {
        render(<Routes />, { wrapper: ProviderWrapperAsRole })

        await waitFor(() => {
            expect(screen.getByRole('button', {
                name: /addroute/i
            })).toBeInTheDocument()
        })
    })

    it('opens add route modal when add route button clicked, and closes on cancel click', async () => {
        const user = userEvent.setup()
        render(<Routes />, { wrapper: ProviderWrapperAsRole })

        await waitFor(async () => {
            const addRouteButton = await screen.findByRole('button', {
                name: /addroute/i
            })

            await user.click(addRouteButton)
            const createRouteButton = await screen.findByRole('button', {
                name: /createroute/i
            })
            expect(createRouteButton).toBeInTheDocument()
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

    it('hides add route button when not authorized to add routes', async () => {
        render(<Routes />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

        await waitFor(() => {
            expect(screen.queryByText(/addroute/i)).not.toBeInTheDocument()
        })
    })

    it('loads rows into data grid when there is data', async () => {
        render(<Routes />, { wrapper: ProviderWrapperAsRole })

        await waitFor(() => {
            expect(screen.getByRole('gridcell', {
                name: /42/i
            })).toBeInTheDocument()
        })
    })
})
