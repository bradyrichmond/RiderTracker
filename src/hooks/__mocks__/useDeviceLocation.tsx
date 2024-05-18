import { useEffect, useState } from 'react'

export const useDeviceLocation = () => {
    const [locationPermissionGranted, setLocationPermissionGranted] = useState<boolean>(false)

    useEffect(() => {
        watchDeviceLocationAccess()
    }, [])

    const watchDeviceLocationAccess = async () => {
        setLocationPermissionGranted(true)
    }

    const getCurrentPositionProxy = async (): Promise<number[]> => {
        return new Promise<number[]>((resolve) => {
            resolve([42, -121])
        })
    }

    return { getCurrentPosition: getCurrentPositionProxy, locationPermissionGranted }
}