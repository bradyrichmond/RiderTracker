import '@testing-library/jest-dom'
import Driver from '../Driver'
import { render, screen, waitFor } from "@testing-library/react"
import { ProviderWrapperAsRole } from '@/helpers/ProviderWrapper'
// @ts-ignore
import DriverApis from '@/API/DriverApis'
jest.mock('@/API/DriverApis')
// @ts-ignore
import OrganizationApis from '@/API/OrganizationApis'
import { Route, Routes } from 'react-router-dom'
jest.mock('@/API/OrganizationApis')

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Driver tests', () => {
    it('renders', async () => {
        render(<Routes><Route path='/drivers/:id' element={<Driver />} /></Routes>, { wrapper: (props: any) => <ProviderWrapperAsRole {...props} routes={['/drivers/b19d7f92-c969-457a-84e0-bf64e986ed6a']} />})

        await waitFor(async () => {
            const populated = await screen.findByText(/driver name: dougie doug/i)
            expect(populated).toBeInTheDocument()
        })
    })
})