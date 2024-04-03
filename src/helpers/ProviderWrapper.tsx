import { RoleContext, RoleContextProvider } from '@/contexts/RoleContextProvider'
import { ApiContextProvider } from '@/contexts/ApiContextProvider'
import { PropsWithChildren, useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface AsRole {
    role?: string
}

export const ProviderWrapper = ({ children }: PropsWithChildren) => {
    return (
        <BrowserRouter>
            <RoleContextProvider>
                <ApiContextProvider>
                    {children}
                </ApiContextProvider>
            </RoleContextProvider>
        </BrowserRouter>
    )
}

export const ProviderWrapperAsRole = ({ children, role }: PropsWithChildren<AsRole>) => {
    return (
        <BrowserRouter>
            <RoleContextProvider>
                <ApiContextProvider>
                    <AsRole role={role}>
                        { children }
                    </AsRole>
                </ApiContextProvider>
            </RoleContextProvider>
        </BrowserRouter>
    )
}

// Wrapper to use the apiContext to set the user role when testing
export const AsRole = ({ children, role }: PropsWithChildren<AsRole>) => {
    const { setHeaviestRole } = useContext(RoleContext)

    useEffect(() => {
        setHeaviestRole(role ?? "RiderTracker_Wizard")
    }, [])

    return (
        <>
            {children}
        </>
    )
}
