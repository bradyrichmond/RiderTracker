import '@testing-library/jest-dom'
// @ts-ignore
import RiderTrackerAPI, * as API from '@/API'
import Buses from '..'
import { render, screen, waitFor } from "@testing-library/react"
import { ProviderWrapper } from '@/helpers/ProviderWrapper'

jest.mock('@/API', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        buses: {
          getBuses: async (_token: string, _args: any[]) => {
            return [
              {
                "id": "b19d7f92-c969-457a-84e0-bf64e986ed6a",
                "busNumber": "267",
                "organizationId": "123"
              },
              {
                "id": "7888888888",
                "busNumber": "12",
                "organizationId": "123"
              },
              {
                "id": "{12-341-222-12-22}",
                "busNumber": "3",
                "organizationId": "123"
              },
              {
                "id": "424-787-111",
                "busNumber": "469",
                "organizationId": "123"
              },
              {
                "id": "e8b3ff46-0024-437e-9e75-f0e319a92cea",
                "busNumber": "69",
                "organizationId": "123"
              },
              {
                "id": "9a381019-c1db-41a0-93c8-c9994f96edb4",
                "busNumber": "420",
                "organizationId": "123"
              }
            ]
          }
        },
        organizations: {
          getOrganizations: async (_token: string, _args: any[]) => {
            return [
              {
                "id": "123"
              },
              {
                "id": "00492e30-ab34-44f6-9843-44f47f2cdf27"
              }
            ]
          }
        },
        execute: async (action: API.ApiFunction, args: any[]) => {
          const modifiedArgs = ['THISisAtoken', ...args]
          const result = await action(...modifiedArgs)
          return result
        }
      }
    })
  }
})

describe('loads and displays Buses component', () => {
  render(<Buses />, { wrapper: ProviderWrapper})

  it('renders buses header', async () => {
    await waitFor(() => {
      const heading = screen.getByRole('heading')
      expect(heading).toHaveTextContent('Buses')
    })
  })

  it("doesn't render add bus button", async () => {
    await waitFor(() => {
      const busButton = screen.queryByText('Add Bus')
      expect(busButton).not.toBeInTheDocument()
    })
  })
})