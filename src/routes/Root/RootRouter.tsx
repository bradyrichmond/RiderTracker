import { AuthUser } from "aws-amplify/auth"
import {
    RouterProvider
} from "react-router-dom"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { createRouterObject } from "@/helpers/CreateRouterObject"

interface RootRouterProps {
    user: AuthUser
}

const RootRouter = ({ user }: RootRouterProps) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const { heaviestRole, updateUserData } = useContext(RoleContext)

    const initialize = useCallback(async () => {
        await updateUserData()
        setIsInitialized(true)
    }, [user])

    useEffect(() => {
        initialize()
    }, [initialize])

    const router = useMemo(createRouterObject, [heaviestRole])

    return (
        <>
            {isInitialized ? <RouterProvider router={router} /> : null}
        </>
    )
}

export default RootRouter