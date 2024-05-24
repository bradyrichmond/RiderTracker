import { RoleContextProvider } from '@/contexts/RoleContextProvider'
import { PropsWithChildren, useEffect } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { useUserStore } from '@/store/UserStore'

export interface AsRole {
    userRole?: string
    routes?: string[]
}

export const ProviderWrapper = ({ children }: PropsWithChildren) => {
    return (
        <MemoryRouter>
            <RoleContextProvider>
                {children}
            </RoleContextProvider>
        </MemoryRouter>
    )
}

export const ProviderWrapperAsRole = ({ children, userRole, routes }: PropsWithChildren<AsRole>) => {
    return (
        <MemoryRouter initialEntries={routes ?? ['/']}>
            <RoleContextProvider>
                <AsRole userRole={userRole}>
                    {children}
                </AsRole>
            </RoleContextProvider>
        </MemoryRouter>
    )
}

// Wrapper to use the roleContext to set the user role when testing
export const AsRole = ({ children, userRole }: PropsWithChildren<AsRole>) => {
    const { setHeaviestRole } = useUserStore()

    useEffect(() => {
        setHeaviestRole(userRole ?? 'RiderTracker_Wizard')
    }, [])

    return (
        <>
            {children}
        </>
    )
}
