import { RoleContextProvider } from '@/contexts/RoleContextProvider'
import { ApiContextProvider } from '@/contexts/ApiContextProvider'
import { PropsWithChildren, useContext, useEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { RoleContext } from '@/contexts/RoleContext'

export interface AsRole {
    userRole?: string
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

export const ProviderWrapperAsRole = ({ children, userRole, routes }: PropsWithChildren<AsRole>) => {
    return (
        <MemoryRouter initialEntries={routes ?? ['/']}>
            <RoleContextProvider>
                <ApiContextProvider>
                    <AsRole userRole={userRole}>
                        {children}
                    </AsRole>
                </ApiContextProvider>
            </RoleContextProvider>
        </MemoryRouter>
    )
}

// Wrapper to use the apiContext to set the user role when testing
export const AsRole = ({ children, userRole }: PropsWithChildren<AsRole>) => {
    const { setHeaviestRole } = useContext(RoleContext)

    useEffect(() => {
        setHeaviestRole(userRole ?? 'RiderTracker_Wizard')
    }, [])

    return (
        <>
            {children}
        </>
    )
}
