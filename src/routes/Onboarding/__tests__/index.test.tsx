import '@testing-library/jest-dom'
import { render, waitFor, screen } from '@testing-library/react'
import Onboarding from '..'
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Onboarding Tests', () => {
    it('starts onboarding at creating org', async () => {
        render(<Onboarding />, { wrapper: ProviderWrapperAsRole })

        await waitFor(() => {
            expect(screen.getByText(/createFirstAdmin/i, { selector: 'h5' })).toBeInTheDocument()
        })
    })
})
