import { RoleContextProvider } from '@/contexts/RoleContextProvider'
import { ApiContextProvider } from '@/contexts/ApiContextProvider'
import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const ProviderWrapper = ({ children }: PropsWithChildren) => {
    return (
        <BrowserRouter>
            <RoleContextProvider>
                <ApiContextProvider>
                    { children }
                </ApiContextProvider>
            </RoleContextProvider>
        </BrowserRouter>
    )
}
