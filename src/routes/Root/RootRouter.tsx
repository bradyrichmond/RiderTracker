import {
    RouterProvider
} from "react-router-dom"
import { useContext, useEffect } from "react"
import { RoleContext } from "@/contexts/RoleContextProvider"
import { createRouterObject } from "@/helpers/CreateRouterObject"
import { Hub } from "aws-amplify/utils"

const router = createRouterObject()

const RootRouter = () => {
    const { updateUserData } = useContext(RoleContext)

    useEffect(() => {
        // @ts-ignore
        const cleanup = Hub.listen('auth', ({ payload: { event, data } }) => {
            console.log(`Auth listener heard ${event}`)

            switch (event) {
                case "signedIn":
                    updateUserData()
                    break
                default:
                    console.log(`Auth listener event complete`)
            }
        })

        return () => {
            cleanup()
        }
    }, [])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default RootRouter