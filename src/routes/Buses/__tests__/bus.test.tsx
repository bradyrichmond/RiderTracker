import '@testing-library/jest-dom'
import Bus from '../Bus'
import { render, screen, waitFor } from '@testing-library/react'
import { AsRole, ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
import { Route, Routes } from 'react-router-dom'
import { PropsWithChildren } from 'react'
jest.mock('@/API/BusApis')
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Bus tests', () => {
    it('renders', async () => {
        render(<Routes><Route path='/buses/:id' element={<Bus />} /></Routes>, { wrapper: (props: PropsWithChildren<AsRole>) => <ProviderWrapperAsRole {...props} routes={['/buses/b19d7f92-c969-457a-84e0-bf64e986ed6a']} /> })

        await waitFor(async () => {
            const populated = await screen.findByText(/bus number: 420/i)
            expect(populated).toBeInTheDocument()
        })
    })
})