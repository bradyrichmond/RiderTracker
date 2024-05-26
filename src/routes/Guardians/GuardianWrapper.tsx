import { useParams } from 'react-router-dom'
import Guardians from '.'

const GuardianWrapper = () => {
    const { id: guardianId } = useParams()

    return (
        <Guardians activeGuardian={guardianId} />
    )
}

export default GuardianWrapper