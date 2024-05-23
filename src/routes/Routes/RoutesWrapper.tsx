import { useParams } from 'react-router-dom'
import Routes from '.'

const RoutesWrapper = () => {
    const { id: routeId } = useParams()

    return (
        <Routes activeRoute={routeId} />
    )
}

export default RoutesWrapper