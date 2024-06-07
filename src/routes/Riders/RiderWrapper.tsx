import { useParams } from 'react-router-dom'
import { Children, PropsWithChildren, ReactElement, cloneElement, isValidElement, useMemo } from 'react'

const RiderWrapper = ({ children }: PropsWithChildren) => {
    const { id: riderId } = useParams()

    const childrenWithProps = useMemo(() => {
        return Children.map(children as ReactElement<{ activeRider?: string }>, (child => {
            if (isValidElement(child)) {
                return cloneElement(child, { activeRider: riderId })
            }
        }))
    }, [riderId, children])

    return (
        <>
            {childrenWithProps}
        </>
    )
}

export default RiderWrapper