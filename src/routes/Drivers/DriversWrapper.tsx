import { useParams } from 'react-router-dom'
import { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement, useMemo } from 'react'

const DriversWrapper = ({ children }: PropsWithChildren) => {
    const { id: riderId } = useParams()

    const childrenWithProps = useMemo(() => {
        return Children.map(children as ReactElement<{ activeDriver?: string }>, (child => {
            if (isValidElement(child)) {
                return cloneElement(child, { activeDriver: riderId })
            }
        }))
    }, [riderId, children])

    return (
        <>
            {childrenWithProps}
        </>
    )
}

export default DriversWrapper