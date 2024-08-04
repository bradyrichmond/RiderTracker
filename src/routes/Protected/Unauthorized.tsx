import { useUserStore } from '@/store/UserStore'
import { Navigate } from 'react-router-dom'

const Unauthorized = () => {
    const userId = useUserStore().currentUser?.id

    const previousPath = location.pathname

    if (!userId) {
        return <Navigate to='/login' replace state={{ previousPath }} />
    }

    return <Navigate to='/app' />
}

export default Unauthorized