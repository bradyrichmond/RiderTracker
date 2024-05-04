import {
    RouterProvider
} from "react-router-dom"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { createRouterObject } from "@/helpers/CreateRouterObject"
import { AuthContext, nullUser } from "@/contexts/AuthContextProvider"
import { getCurrentUser } from "@aws-amplify/auth"
import { createUnauthorizedRouterObject } from "@/helpers/CreateUnauthorizedRouterObject"

const RootRouter = () => {
    const [isInitialized, setIsInitialized] = useState(false)
    const { heaviestRole, updateUserData } = useContext(RoleContext)
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        getUser()
    }, [])
  
    const getUser = async () => {
        try {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
        } catch (e) {
            setUser(nullUser)
        }
    }

    const initialize = useCallback(async () => {
        if (user !== nullUser) {
            await updateUserData()
            setIsInitialized(true)
        }
    }, [user])

    useEffect(() => {
        initialize()
    }, [initialize])

    const router = useMemo(isInitialized ? createRouterObject : createUnauthorizedRouterObject, [heaviestRole])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default RootRouter