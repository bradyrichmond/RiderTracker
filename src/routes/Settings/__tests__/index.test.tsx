import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Settings from '..'
import { PropsWithChildren } from 'react'
import userEvent from '@testing-library/user-event'

afterEach(() => {
    jest.restoreAllMocks()
})

describe('Settings Tests', () => {
    it('shows profile settings', async () => {
        render(<Settings />, { wrapper: ProviderWrapperAsRole })

        await waitFor(() => {
            expect(screen.getByText(/profilesettings/i)).toBeInTheDocument()
            expect(screen.getByText(/orgsettings/i)).toBeInTheDocument()
            expect(screen.getByText(/updatepassword/i)).toBeInTheDocument()
        })
    })

    it('hides additional settings tabs from non admins', async () => {
        render(<Settings />, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} userRole="RiderTracker_Guardian" /> })

        await waitFor(() => {
            expect(screen.getByText(/profilesettings/i)).toBeInTheDocument()
            expect(screen.queryByText(/orgsettings/i)).not.toBeInTheDocument()
        })
    })

    it('changes tabs', async () => {
        const user = userEvent.setup()
        render(<Settings />, { wrapper: ProviderWrapperAsRole })

        await waitFor(() => {
            expect(screen.getByText(/profilesettings/i)).toBeInTheDocument()
        })

        await waitFor(() => {
            const orgSettingsTab = screen.getByText(/orgsettings/i)
            user.click(orgSettingsTab)
            expect(screen.getByText(/orgadmins/i)).toBeInTheDocument()
        })
    })

    it('shows add org admin dialog', async () => {
        const user = userEvent.setup()
        render(<Settings />, { wrapper: ProviderWrapperAsRole })

        await waitFor(() => {
            expect(screen.getByText(/profilesettings/i)).toBeInTheDocument()
        })

        await waitFor(async () => {
            const orgSettingsTab = screen.getByText(/orgsettings/i)
            await user.click(orgSettingsTab)
            expect(screen.getByText(/orgadmins/i)).toBeInTheDocument()
            const addOrgAdmin = screen.getByRole('button', { name: /addorgadmin/i })
            await userEvent.click(addOrgAdmin)
        })

        await waitFor(async () => {
            const cancel = screen.getByRole('button', { name: /cancel/i })
            expect(cancel).toBeInTheDocument()
            await userEvent.click(cancel)
            expect(screen.queryByRole('button', { name: /createadmin/i })).not.toBeInTheDocument()
        })
    })
})