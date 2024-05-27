import { useParams } from 'react-router-dom'
import Riders from '.'

const RiderWrapper = () => {
    const { id: riderId } = useParams()

    return (
        <Riders activeRider={riderId} />
    )
}

export default RiderWrapper