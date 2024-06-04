import '@testing-library/jest-dom'
import { render, waitFor, screen } from '@testing-library/react'
import Onboarding from '..'
import userEvent from '@testing-library/user-event'

jest.mock('aws-amplify/auth', () => ({
    signUp: () => ({
        userId: 'newUserId'
    })
}))

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Onboarding Tests', () => {
    it('starts onboarding at create administrator', async () => {
        render(<Onboarding />)

        await waitFor(() => {
            expect(screen.getByText('createFirstAdmin', { selector: 'h5' })).toBeInTheDocument()
        })
    })

    it.skip('progresses when user clicks next', async () => {
        const user = userEvent.setup()

        render(<Onboarding />)

        await waitFor(async () => {
            const createFirstAdmin = screen.getByText('createFirstAdmin', { selector: 'h5' })
            expect(createFirstAdmin).toBeInTheDocument()
        })

        await waitFor(async () => {
            const firstNameTextBox = screen.getByRole('textbox', {
                name: /firstname/i
            })
            const lastNameTextBox = screen.getByRole('textbox', {
                name: /lastname/i
            })
            const emailTextBox = screen.getByRole('textbox', {
                name: /email/i
            })
            const passwordTextBox = screen.getByLabelText(/password/i)

            await user.type(firstNameTextBox, 'Admin')
            await user.type(lastNameTextBox, 'McAdmin')
            await user.type(emailTextBox, 'admin@mcadmin.edu')
            await user.type(passwordTextBox, '@Dmin123')
        })

        await waitFor(async () => {
            const next = screen.getByRole('button', {
                name: /next/i
            })

            await user.click(next)

            expect(screen.getByRole('heading', {
                name: /emailconfirmationcode/i
            })).toBeInTheDocument()
        })
    })
})
