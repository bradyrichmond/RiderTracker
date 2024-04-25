import { AuthUser } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils";
import { createContext, useMemo } from "react"
import { PropsWithChildren, useState } from "react"

export let nullUser: AuthUser = {
    username: '',
    userId: ''
}

export const AuthContext = createContext({
    user: nullUser,
    setUser: (_user: AuthUser) => {}
});

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<AuthUser>(nullUser)

    useMemo(() => {
        Hub.listen('auth', (eventData) => {
            const { payload } = eventData
            
            if (payload.event === 'signedOut') {
                setUser(nullUser)
                window.location.replace('/')
            }
        })
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};