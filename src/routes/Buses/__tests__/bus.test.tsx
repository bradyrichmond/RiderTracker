import '@testing-library/jest-dom'
import Bus from '../Bus'
import { render, screen, waitFor } from "@testing-library/react"
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
// @ts-ignore
import BusApis from '@/API/BusApis'
jest.mock('@/API/BusApis')
// @ts-ignore
import OrganizationApis from '@/API/OrganizationApis'
import { Route, Routes } from 'react-router-dom'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Bus tests', () => {
    it('renders', async () => {
        render(<Routes><Route path='/buses/:id' element={<Bus />} /></Routes>, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} routes={['/buses/b19d7f92-c969-457a-84e0-bf64e986ed6a']} />})

        await waitFor(async () => {
            const populated = await screen.findByText(/bus number: 420/i)
            expect(populated).toBeInTheDocument()
        })
    })
})