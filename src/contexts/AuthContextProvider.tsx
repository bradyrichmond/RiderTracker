import { AuthUser } from "@aws-amplify/auth"
import { createContext } from "react"
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

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};