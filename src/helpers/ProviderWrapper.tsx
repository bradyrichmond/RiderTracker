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
            {children}
        </MemoryRouter>
    )
}

export const ProviderWrapperAsRole = ({ children, userRole, routes }: PropsWithChildren<AsRole>) => {
    const updateUserData = useUserStore().updateUserData
    const currentUser = useUserStore().currentUser

    useEffect(() => {
        updateUserData()
    }, [updateUserData])

    return (
        <MemoryRouter initialEntries={routes ?? ['/']}>
            <>
                {currentUser ?
                    <AsRole userRole={userRole}>
                        {children}
                    </AsRole>
                    :
                    null
                }
            </>
        </MemoryRouter>
    )
}

// Wrapper to use the roleContext to set the user role when testing
export const AsRole = ({ children }: PropsWithChildren<AsRole>) => {
    return (
        <>
            {children}
        </>
    )
}
