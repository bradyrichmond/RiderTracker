import { RoleContext, RoleContextProvider } from '@/contexts/RoleContextProvider'
import { ApiContextProvider } from '@/contexts/ApiContextProvider'
import { PropsWithChildren, useContext, useEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'

export interface AsRole {
    role?: string
    routes?: string[]
}

export const ProviderWrapper = ({ children }: PropsWithChildren) => {
    return (
        <MemoryRouter>
            <RoleContextProvider>
                <ApiContextProvider>
                    {children}
                </ApiContextProvider>
            </RoleContextProvider>
        </MemoryRouter>
    )
}

export const ProviderWrapperAsRole = ({ children, role, routes }: PropsWithChildren<AsRole>) => {
    return (
        <MemoryRouter initialEntries={routes ?? ['/']}>
            <RoleContextProvider>
                <ApiContextProvider>
                    <AsRole role={role}>
                        { children }
                    </AsRole>
                </ApiContextProvider>
            </RoleContextProvider>
        </MemoryRouter>
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
