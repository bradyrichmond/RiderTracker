import { Dispatch, SetStateAction, createContext } from 'react'

interface RoleContextProps {
    heaviestRole: string
    setHeaviestRole: Dispatch<SetStateAction<string>>
    userFullName: string
    setUserFullName: Dispatch<SetStateAction<string>>
    userEmail: string
    setUserEmail: Dispatch<SetStateAction<string>>
    userId: string
    setUserId: Dispatch<SetStateAction<string>>
    accessToken: string
    setAccessToken: Dispatch<SetStateAction<string>>
    userPictureUrl: string
    setUserPictureUrl: Dispatch<SetStateAction<string>>
    updateUserData: () => Promise<void>
}

export const RoleContext = createContext<RoleContextProps>({
    heaviestRole: 'RiderTracker_Guardian',
    setHeaviestRole: () => {},
    userFullName: '',
    setUserFullName: () => {},
    userEmail: '',
    setUserEmail: () => {},
    userId: '',
    setUserId: () => {},
    accessToken: '',
    setAccessToken: () => {},
    userPictureUrl: '',
    setUserPictureUrl: () => {},
    updateUserData: async () => {}
});