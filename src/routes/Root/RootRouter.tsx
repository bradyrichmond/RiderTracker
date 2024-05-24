import {
    RouterProvider
} from 'react-router-dom'
import { createRouterObject } from '@/helpers/CreateRouterObject'

const router = createRouterObject()

const RootRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default RootRouter