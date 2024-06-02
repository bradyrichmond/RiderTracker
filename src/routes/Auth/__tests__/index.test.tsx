import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import Auth from '..'
import LoginForm from '../LoginForm'
import Logout from '../Logout'

jest.mock('aws-amplify/auth')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Riders Tests', () => {
    it('shows loading screen', async () => {
        render(<Auth />, { wrapper: ProviderWrapperAsRole })
    
        await waitFor(() => {
            expect(screen.getByText(/gatheringLocalData/i, { selector: 'h4' })).toBeInTheDocument()
        })
    })

    it('shows login form', async () => {
        render(<LoginForm />, { wrapper: ProviderWrapperAsRole })
    
        await waitFor(() => {
            expect(screen.getByText(/signin/i)).toBeInTheDocument()
        })
    })

    it('shows logout page', async () => {
        render(<Logout />, { wrapper: ProviderWrapperAsRole })
    
        await waitFor(() => {
            expect(screen.getByText(/loggingOut/i)).toBeInTheDocument()
        })
    })
})