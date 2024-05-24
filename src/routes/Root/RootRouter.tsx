import {
    RouterProvider
} from 'react-router-dom'
import { useEffect } from 'react'
import { createRouterObject } from '@/helpers/CreateRouterObject'
import { Hub } from 'aws-amplify/utils'
import { useUserStore } from '@/store/UserStore'
import { useApiStore } from '@/store/ApiStore'

const router = createRouterObject()

const RootRouter = () => {
    const { updateUserData } = useUserStore()
    const { updateApi } = useApiStore()

    useEffect(() => {
        const cleanup = Hub.listen('auth', ({ payload: { event } }) => {
            console.log(`Auth listener heard ${event}`)

            switch (event) {
                case 'signedIn':
                    initialize()
                    break
                default:
                    console.log('Auth listener event complete', `Event: ${JSON.stringify(event)}`)
            }
        })

        return () => {
            cleanup()
        }
    }, [])

    const initialize = async () => {
        await updateUserData()
        await updateApi()
    }

    return (
        <RouterProvider router={router} />
    )
}

export default RootRouter