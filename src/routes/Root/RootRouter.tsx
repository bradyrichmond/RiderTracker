import {
    RouterProvider
} from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { RoleContext } from "../../contexts/RoleContextProvider"
import { createUnauthorizedRouterObject } from "@/helpers/CreateUnauthorizedRouterObject"
import { createRouterObject } from "@/helpers/CreateRouterObject"
import { Hub } from "aws-amplify/utils"
import { fetchAuthSession } from "aws-amplify/auth"

const authRouter = createRouterObject()
const unauthRouter = createUnauthorizedRouterObject()

const RootRouter = () => {
    const [router, setRouter] = useState<'auth' | 'unauth'>('unauth')
    const { updateUserData } = useContext(RoleContext)

    useEffect(() => {
        // @ts-ignore
        const cleanup = Hub.listen('auth', ({ payload: { event, data } }) => {
            console.log(`Auth listener heard ${event}`)

            switch (event) {
                case "signedIn":
                    updateUserData()
                    setRouter('auth')
                    break
                case  "signedOut":
                    setRouter('unauth')
                    break
                default:
                    console.log(`Auth listener event complete`)
            }
        })

        checkForLoggedInUser()
        return () => {
            cleanup()
        }
    }, [])

    const checkForLoggedInUser = async () => {
        const session = await fetchAuthSession()
        if (session.tokens) {
            setRouter('auth')
        }
    }

    return (
        <>
            {router === 'auth'?
                <RouterProvider router={authRouter} />
                :
                <RouterProvider router={unauthRouter} />
            }
        </>
    )
}

export default RootRouter