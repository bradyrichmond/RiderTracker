import { useParams } from 'react-router-dom'
import Drivers from '.'

const DriversWrapper = () => {
    const { id: driverId } = useParams()

    return (
        <Drivers activeDriver={driverId} />
    )
}

export default DriversWrapper