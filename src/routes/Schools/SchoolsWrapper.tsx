import { useParams } from 'react-router-dom'
import { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement, useMemo } from 'react'

const SchoolWrapper = ({ children }: PropsWithChildren) => {
    const { id: schoolId } = useParams()

    const childrenWithProps = useMemo(() => {
        return Children.map(children as ReactElement<{ activeSchool?: string }>, (child => {
            if (isValidElement(child)) {
                return cloneElement(child, { activeSchool: schoolId })
            }
        }))
    }, [schoolId, children])

    return (
        <>
            {childrenWithProps}
        </>
    )
}

export default SchoolWrapper