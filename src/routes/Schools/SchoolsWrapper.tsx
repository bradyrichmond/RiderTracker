import { useParams } from 'react-router-dom'
import Schools from '.'

const SchoolWrapper = () => {
    const { id: schoolId } = useParams()

    return (
        <Schools activeSchool={schoolId} />
    )
}

export default SchoolWrapper